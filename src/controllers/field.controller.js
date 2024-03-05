import { Field } from '../model/field.model.js';
import { Response } from '../model/response.model.js';
import { catchAsync } from '../utils/catchAsync.js';
import { airtableAxios } from '../utils/transferData.js';
import _ from 'lodash';

// export const createFields = catchAsync(async (req, res, next) => {
//   const airBody = {
//     fields: req.body.fields.map((field) => {
//       let fieldAir = {
//         name: field.name,
//         type: field.type
//       };
//       field.description && (fieldAir.description = field.description);
//       field.options && (fieldAir.options = field.options);
//       return fieldAir;
//     }),
//     name: req.body.name
//   };
//   req.body.description && (airBody.description = req.body.description);
//   try {
//     let result = await airtableAxios.post(
//       `/meta/bases/${req.body.campaign_id}/tables`,
//       airBody
//     );
//   } catch (err) {
//     res.status(parseInt(err.response.status)).json({
//       err
//     });
//   }
//   const fields = req.body.fields.map((field) => {
//     field.survey_id = req.body.id;
//     return field;
//   });
//   const results = await Field.insertMany(fields);
//   res.status(201).json({
//     status: 'success',
//     data: {
//       survey: {
//         id: req.body.id,
//         name: req.body.name,
//         created_time: req.body.created_time,
//         start_time: req.body.start_time,
//         end_time: req.body.end_time,
//         status: req.body.status,
//         campaign_id: req.body.campaign_id
//       },
//       fields: results
//     }
//   });
// });

export const getAllFields = catchAsync(async (req, res, next) => {
  let fields = req.body.survey.fields;
  let surveyId = req.params.id;
  for (let field of fields) {
    let fieldDB = await Field.findById(field.id);
    if (!fieldDB) {
      let newField = {
        _id: field.id,
        name: field.name,
        type: field.type,
        survey_id: surveyId
      };
      field.description && (newField.description = field.description);
      field.options && (newField.options = field.options);
      await Field.create(newField);
    }
    if (fieldDB && fieldDB.name !== field.name) {
      await Field.findByIdAndUpdate(field.id, { name: field.name });
    }
    if (fieldDB && fieldDB.description !== field.description) {
      await Field.findByIdAndUpdate(field.id, {
        description: field.description
      });
    }
    if (fieldDB && fieldDB.type !== field.type) {
      await Field.findByIdAndUpdate(field.id, { type: field.type });
    }
    if (fieldDB && _.isEqual(fieldDB.options, field.options)) {
      await Field.findByIdAndUpdate(field.id, { options: field.options });
    }
  }
  let fieldsDB = await Field.find({ survey_id: surveyId }, { __v: false });
  let listFieldId = fields.map((field) => field.id);
  let delFlag = false;
  for (let fieldDB of fieldsDB) {
    if (!listFieldId.includes(fieldDB._id)) {
      delFlag = true;
      await Field.findByIdAndDelete(fieldDB._id);
      let response = await Response.find({ survey_id: surveyId });
      for (let res of response) {
        delete res.fields[fieldDB.name];
        await Response.findByIdAndUpdate(res._id, { fields: res.fields });
      }
    }
  }
  if (delFlag) {
    fieldsDB = await Field.find({ survey_id: surveyId }, { __v: false });
  }

  res.status(200).json({
    status: 'success',
    data: {
      survey: req.body.surveyDB,
      fields: fieldsDB
    }
  });
});
