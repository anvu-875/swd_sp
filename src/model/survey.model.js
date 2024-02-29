import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Survey's name is required."]
  },
  created_time: {
    type: Date,
    default: Date.now()
  },
  start_time: {
    type: Date,
    required: [true, "Survey's start time is required."]
  },
  end_time: {
    type: Date,
    required: [true, "Survey's end time is required."]
  },
  status: {
    type: String,
    enum: ['acitve', 'disabled'],
    default: 'acitve'
  },
  campaign_id: {
    type: ObjectId,
    ref: 'Campaign',
    required: [true, "Campaign's id is required."]
  }
});

export const Survey = mongoose.model('Survey', surveySchema);
