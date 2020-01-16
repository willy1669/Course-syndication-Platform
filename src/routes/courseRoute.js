import { Router } from 'express';
import { createNewCourse, findACourse } from '../controllers/courseController';

const route = new Router();

//Get course listing.
route.post('/newCourse', createNewCourse);
route.get('/:courseTitle', findACourse);

export default route;