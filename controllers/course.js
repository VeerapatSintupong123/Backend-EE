const Course = require('../models/Course');

exports.getCourses = async (req,res)=>{
    try{
        const course = await Course.find();

        res.status(200).json({
            success: true,
            data: course,
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
};

exports.createCourse = async (req,res)=>{
    try{
        const course = await Course.create(req.body);
        
        res.status(200).json({
            success: true,
            data: course
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
};