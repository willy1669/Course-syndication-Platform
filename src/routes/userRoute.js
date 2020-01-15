import { Router } from 'express';
import { userSignUp, userLogin } from '../controllers/userController';

const route = new Router();

//Get user listing.
route.post('/signUp', userSignUp);
route.post('/login', userLogin);

export default route;