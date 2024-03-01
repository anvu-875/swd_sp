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
  next();
});
