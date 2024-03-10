import { body, validationResult } from 'express-validator';
import { Survey } from '../model/survey.model.js';
import { Field, validTypes } from '../model/field.model.js';
import _ from 'lodash';

let optionsBody = undefined;

const validateOptionsField = async (value, { req }) => {
  if (req.body.type === 'singleSelect' || req.body.type === 'multipleSelects') {
    if (!Array.isArray(value)) {
      throw new Error('options must be an array');
    }
    value.forEach((item) => {
      if (typeof item !== 'string') {
        throw new Error('options must be an array of string');
      }
    });
    let arrayColors = structuredClone(selectTypeOptionColors);
    let choices = value.map((item) => {
      let fixedItem = {
        name: item,
        color: _.sample(arrayColors)
      };
      arrayColors = arrayColors.filter((color) => color !== fixedItem.color);
      if (arrayColors.length === 0) {
        arrayColors = structuredClone(selectTypeOptionColors);
      }
      return fixedItem;
    });
    optionsBody = { choices };
    return true;
  }
  if (req.body.type === 'date') {
    if (
      !value ||
      !value.dateFormat ||
      !value.dateFormat.format ||
      !value.dateFormat.name
    ) {
      optionsBody = { dateFormat: dateTypeOptions[0] };
      return true;
    }
    let option = dateTypeOptions.find((option) =>
      _.isEqual(option, value.dateFormat)
    );
    if (!option) {
      throw new Error('Invalid date type option');
    }
    return true;
  }
  if (req.body.type === 'checkbox') {
    optionsBody = {
      icon: 'check',
      color: 'greenBright'
    };
    return true;
  }
  if (req.body.type === 'rating') {
    optionsBody = {
      icon: 'star',
      max: 5,
      color: 'yellowBright'
    };
    return true;
  }
};

export const validateSurveyFieldForCreate = [
  body('name')
    .notEmpty()
    .withMessage('field name is required')
    .bail()
    .isString()
    .withMessage('field name must be a string')
    .bail()
    .custom(async (value, { req }) => {
      const isExist = await Field.exists({
        name: value,
        survey_id: req.params.surveyId
      });
      if (isExist) throw new Error('field name already exist');
    }),
  body('description')
    .optional()
    .isString()
    .withMessage('field description must be a string'),
  body('type')
    .notEmpty()
    .withMessage('field type is required')
    .bail()
    .isString()
    .withMessage('field type must be a string')
    .bail()
    .custom(async (value, { req }) => {
      if (!validTypes.includes(value)) {
        throw new Error('Invalid type');
      }
      return true;
    }),
  body('options').custom(validateOptionsField)
];

export const validateSurveyFieldForUpdate = [
  body('name')
    .optional()
    .bail()
    .isString()
    .withMessage('field name must be a string')
    .bail()
    .custom(async (value, { req }) => {
      let field = await Field.findById(req.params.fieldId);
      const isExist = await Field.exists({
        name: value,
        survey_id: field.survey_id
      });
      if (isExist) throw new Error('field name already exist');
    }),
  body('description')
    .optional()
    .isString()
    .withMessage('field description must be a string')
];

export const validateSurveyForUpdate = [
  body('name')
    .optional()
    .isString()
    .withMessage('survey name must be a string')
    .bail()
    .custom(async (value, { req }) => {
      let survey = await Survey.findById(req.params.surveyId);
      const isExist = await Survey.exists({
        name: value,
        campaign_id: survey.campaign_id
      });
      if (isExist) throw new Error('survey name already exist');
    }),
  body('description')
    .optional()
    .isString()
    .withMessage('survey description must be a string')
];

export const verifyFields =
  (...allowedFields) =>
  (req, res, next) => {
    const receivedFields = Object.keys(req.body);
    const unknownFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (unknownFields.length > 0) {
      return res.status(400).json({
        statusCode: 400,
        errors: unknownFields.map((field) => `Unknown field: ${field}`)
      });
    }
    optionsBody && (req.body.options = structuredClone(optionsBody));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        errors: errors.array()
      });
    }
    optionsBody = undefined;
    next();
  };

export const selectTypeOptionColors = [
  'blueLight2',
  'cyanLight2',
  'tealLight2',
  'greenLight2',
  'yellowLight2',
  'orangeLight2',
  'redLight2',
  'pinkLight2',
  'purpleLight2',
  'grayLight2',
  'blueLight1',
  'cyanLight1',
  'tealLight1',
  'greenLight1',
  'yellowLight1',
  'orangeLight1',
  'redLight1',
  'pinkLight1',
  'purpleLight1',
  'grayLight1',
  'blueBright',
  'cyanBright',
  'tealBright',
  'greenBright',
  'yellowBright',
  'orangeBright',
  'redBright',
  'pinkBright',
  'purpleBright',
  'grayBright',
  'blueDark1',
  'cyanDark1',
  'tealDark1',
  'greenDark1',
  'yellowDark1',
  'orangeDark1',
  'redDark1',
  'pinkDark1',
  'purpleDark1',
  'grayDark1'
];

export const dateTypeOptions = [
  {
    format: 'l',
    name: 'local'
  },
  {
    format: 'LL',
    name: 'friendly'
  },
  {
    format: 'M/D/YYYY',
    name: 'us'
  },
  {
    format: 'D/M/YYYY',
    name: 'european'
  },
  {
    format: 'YYYY-MM-DD',
    name: 'iso'
  }
];
