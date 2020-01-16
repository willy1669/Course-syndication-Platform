import { Router } from 'express';
import { userSignUp, userLogin, userSignUpForACourse } from '../controllers/userController';
import auth from '../middleware/auth';

const route = new Router();

//Get user listing.
route.post('/signUp', userSignUp);
route.post('/login', auth, userLogin);
route.post('/courseSignup/:courseId', auth, userSignUpForACourse);

export default route;