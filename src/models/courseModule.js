import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const courseModuleSchema = new Schema({
    duration: {
        type: Date,
    },
    courseModulebody: {
        type: String,
    },
});

const CourseModule = mongoose.model('CourseModule', courseModuleSchema);

export default CourseModule;
