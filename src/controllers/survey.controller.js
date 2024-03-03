import { Field } from '../model/field.model.js';
import { Survey } from '../model/survey.model.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createSurvey = catchAsync(async (req, res, next) => {
  const survey = await Survey.create({
    name: req.body.name,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    campaign_id: req.body.campaign_id
  });
  req.body.id = survey._id.toString();
  req.body.created_time = new Date(survey.created_time).getTime();
  req.body.status = survey.status;
  next();
});

export const getAllSurveys = catchAsync(async (req, res, next) => {
  const surveys = await Survey.find();
  res.status(200).json({
    status: 'success',
    data: {
      surveys
    }
  });
});

export const getSurveyById = catchAsync(async (req, res, next) => {
  const survey = await Survey.findById(req.params.id);
  const fields = await Field.find({ survey_id: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      survey,
      fields
    }
  });
});
