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
  