import * as mongoose from 'mongoose';
import { sendMessage } from '../config/twilioService';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
  },
  courses: [{
    courseId: {
      type: ObjectId,
      ref: 'Course',
    },
    numberOfTimesRequested: {
      type: Number,
    },
    timeOfDay: {
      type: Date
    },
    daysOfTheWeek: [{
      type: String,
    }],
    timeZone: {
      type: String
    }
  }],
  countryCode: {
    type: String,
  },
  requestedTime: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
