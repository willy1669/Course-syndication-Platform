import { createCourse, getCourseByTite } from '../services/courseService';

//Define create course function
export const createNewCourse = async (req, res) => {
  try {
    const { courseTitle } = req.body;
    const user = await createCourse(req, res, data);
    return user;
  } catch (exception) {
    console.error(`Error: ${exception}`);
  }
};

export const findACourse = async (req, res) => {
  try {
    const { courseTitle } = req.params;
    const user = await createCourse(req, res, courseTitle);
    return user;
  } catch (exception) {
    console.error(`Error: ${exception}`);
  }
};