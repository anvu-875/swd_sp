import mongoose from 'mongoose';

export const validTypes = [
  'singleLineText',
  'multilineText',
  'singleSelect',
  'multipleSelects',
  'email',
  'url',
  'date',
  'phoneNumber',
  'multipleAttachments',
  'checkbox',
  'singleCollaborator',
  'rating'
];

const fieldSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "Field's id is required."]
  },
  name: {
    type: String,
    required: [true, "Field's question text is required."]
  },
  type: {
    type: String,
    enum: validTypes,
    required: [true, "Field's type is required."]
  },
  description: {
    type: String
  },
  options: {
    type: mongoose.Schema.Types.Mixed
  },
  survey_id: {
    type: String,
    ref: 'Survey',
    required: [true, "Survey's id is required."]
  }
});

export const Field = mongoose.model('Field', fieldSchema);
