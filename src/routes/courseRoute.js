import { Router } from 'express';
import { createNewCourse } from '../controllers/courseController';

const route = new Router();

//Get course listing.
route.post('/newCourse', createNewCourse);

export default route;