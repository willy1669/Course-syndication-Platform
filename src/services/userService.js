import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-local';
import applicant from '../models/user';

//Define schema for validating user input
const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
  });

export const signUp = async (req, res, data) => {
    try {
      const validate = await Joi.validate({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }, schema);
      if (!validate) res.status(402).json({ message: 'validation failed' });
      if (data.password === data.confirmPassword) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        const hashConfirmPassword = passwordHash;
        data.password = passwordHash;
        data.confirmPassword = hashConfirmPassword;
        const user = await applicant.create(data);
        if (!user) res.status(402).json({ message: 'Something went wrong.Please try again' });
        else if (user.password !== user.confirmPassword) res.status(400).json({ message: 'password does not match' });
        else {
          res.status(200).json({ message: 'applicant, created successfully' });
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
          return res.status(500).json({ message: 'You haven\'t registered your account' });
        }
        if (user && isValidPassword(user, req.body.password)) {
          const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY, { expiresIn: 86400 });
          res.status(202).json({
            userId: user._id, email: user.email, token, message: 'Login successful.',
          });
        } else {
            res.status(400).json({ message: 'Incorrect email or password.' });
          }
      }),
      (err) => {
        if (err) {
          res.status(400).json({ message: 'create an account' });
        }
      },
    ));
  } catch (exception) {
    console.log(exception);
  }
};
