import { Field } from '../model/field.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createFields = catchAsync(async (req, res, next) => {
  const fields = req.body.fields.map((field) => {
    field.survey_id = req.body.id;
    return field;
  });
  const results = await Field.insertMany(fields);
  res.status(201).json({
    status: 'success',
    data: {
      id: req.body.id,
      name: req.body.name,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      campaign_id: req.body.campaign_id,
      fields: results
    }
  });
});
