import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'dropdown', 'star'],
    required: [true, "Field's type is required."]
  },
  default_value: {
    type: String
  },
  question_text: {
    type: String,
    required: [true, "Field's question text is required."]
  },
  question_image: {
    type: String
  },
  option: {
    type: [String]
  },
  survey_id: {
    type: ObjectId,
    ref: 'Survey',
    required: [true, "Survey's id is required."]
  }
});

export const Field = mongoose.model('Field', fieldSchema);
