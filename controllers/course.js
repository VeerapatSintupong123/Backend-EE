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

exports.getCourse = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id);

        if(!course)
            res.status(400).json({
                success: false,
                message: "Can not find course"
            });

        res.status(200).json({
            success: true,
            data: course
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.updateCourse = async (req,res)=>{
    try{
        const course = await Course.findByIdAndUpdate(req.params.id, req.body);
        const id = req.params.id;

        if(!course)
            res.status(400).json({
                success: false,
                message: "Can not find course"
            });

        res.status(200).json({
            success: true,
            message: "update " + id
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

exports.deleteCourse = async (req,res)=>{
    try{
        const course = await Course.findByIdAndDelete(req.params.id);
        const id = req.params.id;

        if(!course)
            res.status(400).json({
                success: false,
                message: "Can not find course"
            });

        res.status(200).json({
            success: true,
            message: "delete " + id
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};