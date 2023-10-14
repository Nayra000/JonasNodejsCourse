const userModel = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync') ;
const AppError  =require('./../utils/appErorr');




const filterObj =(obj ,...allowedFields)=>{
    let newObj ={};
    Object.keys(obj).forEach(e =>{
        if(allowedFields.includes(e)){
            newObj[e]=obj[e];
        }
    })
    return newObj;
}

exports.getAllUsers =catchAsync(async(req,res,next)=>{ 
    const users =await userModel.find();
    res.status(200).json({
        "statuts" :"suceess",
        "length":users.length,
        "timeRequest" :req.requestTime,
        "data" :{users}
    })
})

exports.getSingleUser =(req,res)=>{
    res.status(500).json({
        "statuts" :"ERROR",
        "timeRequest" :req.requestTime,
        data:null
    })
}

exports.createNewUser =(req,res)=>{
    res.status(500).json({
        "statuts" :"ERROR",
        "timeRequest" :req.requestTime,
        data:null
    })
}

exports.updateUser =(req,res)=>{
    res.status(500).json({
        "statuts" :"ERROR",
        "timeRequest" :req.requestTime,
        data:null
    })
}

exports.deleteUser =(req,res)=>{
    res.status(500).json({
        "statuts" :"ERROR",
        "timeRequest" :req.requestTime,
        data:null
    })
}

exports.updateMe=catchAsync(async(req ,res ,next)=>{
     // 1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This is route is not for password upadates' ,400));
    }

    //2)filter body
    const filteredBody = filterObj(req.body ,'name' ,'email');

    //3)updating
    const user =await userModel.findByIdAndUpdate({_id:req.user.id} ,filteredBody, {
        new :true,
        runValidators :true
    })

    res.status(200).json({
        "status": "success",
        "data":{user}
    })

})

exports.deleteMe =catchAsync(async(req , res, next)=>{
    await userModel.findByIdAndUpdate({_id : req.user.id} ,{active :false});
    res.status(204).json({
        "status": "success",
    })

})