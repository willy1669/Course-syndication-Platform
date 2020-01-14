import * as mongoose from 'mongoose';

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
    type: ObjectId,
    ref: 'Course',
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
