const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    type: { type: String, enum: ["Answering", "4MCQ", "2MCQ"], required: true },
    time: {type: String, required: true},
    question: { type: String, required: true },
    choice: { type: [String], default: [] },
    answer: { type: String, default: "" },
    reason: { type: String, default: "" }
});

const CourseSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please add a subject name'],
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    chapter: {
        type: String,
        required: [true, 'Please add a chapter'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image link'],
    },
    video: {
        type: String,
        required: [true, 'Please add a video link'],
    },
    alert: {
        type: [alertSchema],
        default: []
    }
});

module.exports = mongoose.model('Course', CourseSchema);
