import mongoose from 'mongoose';

// const responseSchema = mongoose.Schema({
//   email: {
//     type: String,
//     required: [true, 'Email is required!'],
//     validate: [validator.default.isEmail, 'Email is not valid!']
//   },
//   created_time: {
//     type: Date,
//     default: Date.now()
//   }
// });

const responseSchema = new mongoose.Schema({
  _id: { type: String, required: [true, "Response's id is required."] },
  createdTime: {
    type: Date,
    required: [true, "Response's created time is required."]
  },
  fields: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Response's fields are required."]
  },
  survey_id: {
    type: String,
    ref: 'Survey',
    required: [true, "Survey's id is required."]
  }
});

export const Response = mongoose.model('Response', responseSchema);
