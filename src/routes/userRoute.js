import { Router } from 'express';
import { userSignUp } from '../controllers/userController';

const route = new Router();

//Get user listing.
route.post('/signUp', userSignUp);

export default route;