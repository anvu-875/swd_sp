import { body } from 'express-validator';
import AppError from '../utils/appError';
import { Survey } from '../model/survey.model';
import { Campaign } from '../model/campaign.model';

export const validateSurveyRes = [
  body('name')
    .notEmpty()
    .withMessage('survey name is required')
    .bail()
    .isString()
    .withMessage('survey name must be a string')
    .bail()
    .custom(async (value, { req }) => {
      const isSurveyExist = await Survey.exists({ name: value });
      if (isSurveyExist) throw new AppError('survey name already exist', 400);
    }),
  body('start_time')
    .notEmpty()
    .withMessage('survey start time is required')
    .bail()
    .custom((value, { req }) => {
      const isValidDate = !isNaN(value) && value > 0;
      if (!isValidDate) {
        throw new AppError('survey start time must be a number', 400);
      }
      return true;
    }),
  body('end_time')
    .notEmpty()
    .withMessage('survey end time is required')
    .bail()
    .custom((value, { req }) => {
      const isValidDate =
        !isNaN(value) &&
        value > 0 &&
        value > req.body.start_time &&
        value > Date.now();
      if (!isValidDate) {
        throw new AppError('survey end time is invalid date', 400);
      }
      return true;
    }),
  body('campaign_id')
    .notEmpty()
    .withMessage('campaign id is required')
    .bail()
    .isString()
    .withMessage('campaign id must be a string')
    .bail()
    .custom(async (value, { req }) => {
      const isCampaignExist = await Campaign.exists({ _id: value });
      if (!isCampaignExist) throw new AppError('Campaign not found', 404);
    }),
  body('fields')
];
