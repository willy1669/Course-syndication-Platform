import courseModule from '../models/courseModule';
import course from '../models/course';

export const createCourseModule = async (req, res, courseId, courseModulebody) => {
    const courseResult = await course.findOne({ _id: courseId });
    if (error) res.status(402).json({ message: 'course could not be created'});
    else {
        const courseModuleResult = await courseModule.create(data);
        if (error) res.status(402).json({ message: 'course could not be created'});
        else {
            await courseResult.courseModules.push(CourseModule);
            await courseResult.save();
            res.status(202).json({ data: courseModuleResult, message: 'course module created successfully' });
        }
    }
}