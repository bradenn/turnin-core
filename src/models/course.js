import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    instructor: mongoose.ObjectId,
    code: String,
    locked: Boolean,
    dateEdited: {type: Date, default: Date.now},
    dateCreated: {type: Date, default: Date.now}
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
