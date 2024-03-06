import mongoose from 'mongoose';

const campaignShema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Campaign's id is required."]
  },
  name: {
    type: String,
    required: [true, "Campaign's name is required."]
  },
  permissionLevel: {
    type: String
  }
});

export const Campaign = mongoose.model('Campaign', campaignShema);
