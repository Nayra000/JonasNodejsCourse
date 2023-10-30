const tourModel =require('./../models/tourModel');
const userModel =require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');


//Based on MVC Arch , we get the data from model and send it to view through controller 
exports.getOverview = catchAsync(async(req ,res ,next) =>{
    const tours = await tourModel.find();
    res.status(200).render('overview', {title :'Natours' ,tours})
})

exports.getTour =catchAsync(async (req , res ,next)=>{
    const slug =req.params.slug;
    const tour =await tourModel.findOne({slug}).populate({path :"reviews" ,field :"review rating user"});
    if(!tour){
        return next(new AppError('There is no tour with that name' ,404));
    }
    res.status(200).render('tour',{title :`${tour.name} Tour`,tour})
})


exports.getLoginForm =(req ,res ) =>{
    res.status(200).render('login')
}

exports.getAccount =(req ,res ) =>{
    res.status(200).render('account')
}

exports.updateUserData =catchAsync(async(req , res , next)=>{
    const updatedUser =await userModel.findByIdAndUpdate(req.user.id ,{
        name : req.body.name,
        email:req.body.email
    },{
        new :true ,
        runValidators:true
    }) 
  

    res.status(200).render('account' , {title:'Your account',user: updatedUser});
})