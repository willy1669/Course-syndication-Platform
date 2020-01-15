import { createCourseModule } from '../services/courseService';

//Define create course module function
export const createNewCourseModule = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { courseModulebody } = req.body;
        const user = await createCourse(req, res, courseId, courseModulebody);
        return user;
    } catch (exception) {
      console.error(`Error: ${exception}`);
    }
  };