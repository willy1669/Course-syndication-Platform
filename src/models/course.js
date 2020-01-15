import * as mongoose from 'mongoose';

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const courseSchema = new Schema({
    courseTitle: {
        type: String,
    },
    duration: {
        type: String,
    },
    courseModules: [{
        type: ObjectId,
        ref: 'CourseModule',
    }],
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
