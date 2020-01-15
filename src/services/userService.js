import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { RecurrenceRule } from 'node-schedule-tz'
import moment from 'moment'
import { Strategy } from 'passport-local';
import user from '../models/user';
import twilioService from '../config/twilioService'

//Define schema for validating user input
const schema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required(),
  countryCode: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  });

export const signUp = async (req, res, data) => {
    try {
      const validate = await Joi.validate({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        countryCode: data.phoneNumber,
        phoneNumber: data.phoneNumber,
      }, schema);
      if (!validate) res.status(402).json({ message: 'validation failed' });
      if (data.password === data.confirmPassword) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const hashConfirmPassword = passwordHash;
        data.password = passwordHash;
        data.confirmPassword = hashConfirmPassword;
        const user = await user.create(data);
        if (!user) res.status(402).json({ message: 'Something went wrong.Please try again' });
        else if (user.password !== user.confirmPassword) res.status(402).json({ message: 'password does not match' });
        else {
          res.status(202).json({ message: 'applicant, created successfully' });
        }
      } else {
        res.status(402).json({ message: 'password does not match' });
      }
    } catch (exception) {
      throw new Error(`Error: ${exception}`);
    }
};

//Define user login
const isValidPassword = (user, password) => bcrypt.compare(password, user.password);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  applicant.findById(id, (err, user) => {
    done(err, user);
  });
});

export const login = async (req, res) => {
  passport.authenticate('login', {
    successRedirect: '/users',
    failureRedirect: '/login',
  });
  try {
    passport.use('login', new Strategy(
      await applicant.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
          return res.status(402).json({ message: 'You haven\'t registered your account' });
        }
        if (user && isValidPassword(user, req.body.password)) {
          const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
          res.status(202).json({
            userId: user._id, email: user.email, token, message: 'Login successful.',
          });
        } else {
            res.status(402).json({ message: 'Incorrect email or password.' });
          }
      }),
      (err) => {
        if (err) {
          res.status(402).json({ message: 'create an account' });
        }
      },
    ));
  } catch (exception) {
    console.log(exception);
  }
};

export const userSignUpForCourse = async (req, res, userId, courseDetails) => {
  const { timeZones, numberOfRequest, time, daysOfTheWeek  } = req.body;
  const daysOfTheWeek  = req.body.daysOfTheWeek.split(',');
  const userResult = await user.findOne({_id: userId });
  if (!userResult) {
    return res.status(402).json({ message: 'You haven\'t registered your account' });
  } else {
    const courseResult = await courseResult.findOne({ courseTitle: courseDetails});
    if (!courseResult) {
      return res.status(402).json({ message: 'course doesn\'t exist'});
    } else {
      user.findOneAndUpdate({ _id: userResult._id}, {$push: {'courses': {courseId: courseResult._id, timeZone: timeZones, numberOfTimesRequested: numberOfRequest, time: time, daysOfTheWeek: daysOfTheWeek }}}, {safe: true, upsert: true});
      await user.save();
      res.status(202).json({ message: `${userResult.name} has signed for ${courseResult.courseTitle} successfully`})
    }
  }
};