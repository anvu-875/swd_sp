import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const responseItemSchema = mongoose.Schema({
  value: {
    type: String,
    required: [true, "Response item's value is required."]
  },
  response_id: {
    type: ObjectId,
    ref: 'Response',
    required: [true, "Response's id is required."]
  },
  field_id: {
    type: ObjectId,
    ref: 'Field',
    required: [true, "Field's id is required."]
  },
  survey_id: {
    type: ObjectId,
    ref: 'Survey',
    required: [true, "Survey's id is required."]
  }
});

export const ResponseItem = mongoose.model('ResponseItem', responseItemSchema);
