import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Survey's id is required."]
  },
  name: {
    type: String,
    required: [true, "Survey's name is required."]
  },
  description: {
    type: String
  },
  campaign_id: {
    type: String,
    ref: 'Campaign',
    required: [true, "Campaign's id is required."]
  }
},
{ timestamps: true }
);

export const Survey = mongoose.model('Survey', surveySchema);
