const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    subject : {
        type : String,
        required : [true , 'Please add a subject name'],
    },
    title : {
        type :String,
        required : [true , 'Please add a title'],
    },
    chapter : {
        type : String,
        required : [true , 'Please add an chapter'],
    },
    dicription : {
        type : String,
        required : [true , 'Please add an dicription'],
    },
    image : {
        type : String,
        required : [true , 'Please add an image link'],
    },
    video : {
        type : String,
        required : [true , 'Please add a video link'],
    }
});

module.exports = mongoose.model('Course',CourseSchema);