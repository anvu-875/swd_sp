import mongoose from 'mongoose';

const responseSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    validate: [validator.default.isEmail, 'Email is not valid!']
  },
  created_time: {
    type: Date,
    default: Date.now()
  }
});

export const Response = mongoose.model('Response', responseSchema);
