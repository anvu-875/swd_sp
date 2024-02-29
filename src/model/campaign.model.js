import mongoose from 'mongoose';

const campaignShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Campaign's name is required."]
  },
  created_time: {
    type: Date,
    default: Date.now()
  },
  start_time: {
    type: Date,
    required: [true, "Campaign's start time is required."]
  },
  end_time: {
    type: Date,
    required: [true, "Campaign's end time is required."]
  },
  status: {
    type: String,
    enum: ['acitve', 'disabled'],
    default: 'acitve'
  }
});

export const Campaign = mongoose.model('Campaign', campaignShema);
