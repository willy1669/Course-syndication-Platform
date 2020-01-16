import { Router } from 'express';
import { createNewCourseModule } from '../controllers/courseModuleController';

const route = new Router();

//Get course module listing.
route.post('/newCourseModule/:courseId', createNewCourseModule);

export default route;