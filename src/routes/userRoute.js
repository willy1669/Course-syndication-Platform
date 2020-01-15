import { Router } from 'express';
import { userSignUp, userLogin, userSignUpForACourse } from '../controllers/userController';

const route = new Router();

//Get user listing.
route.post('/signUp', userSignUp);
route.post('/login', userLogin);
route.post('/courseSignup/:courseId', userSignUpForACourse);

export default route;