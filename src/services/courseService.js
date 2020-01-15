import course from '../models/course';

export const createCourse = async (req, res, data) => {
    const courseResult = await course.create(data);
    if (error) res.status(402).json({ message: 'course could not be created'});
    else {
        res.status(202).json({ message: 'course created successfully' });
    }
}