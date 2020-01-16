import { createCourse } from '../services/courseService';

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