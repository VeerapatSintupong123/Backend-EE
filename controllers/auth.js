const User = require('../models/User');

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    //Creaet token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV==='production'){
        options.secure = true;
    }
    res.status(statusCode).cookie('token',token,options).json({
        success: true,
        token
    })
};

exports.register = async (req,res,next) => {
    try{
        const {name,telephone_number,email,role,password,fullName,
            gender,age,schoolName,schoolProvince,schoolLevel} = req.body;    

        //Create user
        const user = await User.create({
            name:name,
            telephone_number:telephone_number,
            email:email,
            role:role,
            password:password,
            fullName: fullName,
            gender: gender,
            age: age,
            schoolName: schoolName,
            schoolProvince: schoolProvince,
            schoolLevel: schoolLevel,
        });

        sendTokenResponse(user,200,res);
    } catch (err){
        console.log(err);
        res.status(400).json({success:false,error:err.message});
    }
};

exports.login = async (req,res,next) => {
    const {email,password} = req.body;

    //Validate email and password
    if(!email || !password){
        return res.status(400).json({
            success: false,
            msg: 'Please provide an email and password'
        });
    }

    //Check for user
    const user = await User.findOne({email}).select('password');
    if(!user){
        return res.status(400).json({
            success: false,
            msg: 'Invalid credentials'
        });
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return res.status(401).json({
            success: false,
            msg: 'Invalid credentials'
        });
    }

    sendTokenResponse(user,200,res);
}

exports.getMe = async(req,res,next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,  
        data: user
    });
};

exports.logout = async (req,res,next) => {
    res.cookie('token','none',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
}

exports.testAuth = async (req,res)=>{
    res.status(200).json({
        success: true,
        data: "user"
    });
};

exports.updateUser = async (req,res)=>{
    try{
        const User = require("../models/User");
        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        if(!user)
            res.status(400).json({
                success: false,
                message: "Can not find course"
            });

        res.status(200).json({
            success: true,
            data: user
        });
    }catch(error){
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}