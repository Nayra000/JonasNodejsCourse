const tourModel =require('./../models/tourModel');
const ApiFeatures =require(`${__dirname}/../utils/apiFeatures`);
const catchAsync =require('./../utils/catchAsync');
const AppError  =require('./../utils/appErorr');


exports.aliasTopTours =(req ,res ,next)=>{
    req.query.sort= '-ratingsAverage,price';
    req.query.limit='5';
    req.query.fields='name,price,ratingsAverage,price,description';
    next();
}


exports.getAllTours =catchAsync(async (req ,res ,next)=>{
    const counts =await tourModel.countDocuments(); 
    let query =new ApiFeatures("" , req.query).filter().sort().limit().paginate(counts) ;
    const tours = await query.query;
    res.status(200).json({
        "statuts" :"suceess",
        "length":tours.length,
        "timeRequest" :req.requestTime,
        "data" :{tours}
    })
}
)


exports.getSingleTour =catchAsync(async (req ,res ,next)=>{
    const tour =await tourModel.findById(req.params.id); 
    if(!tour) {
        return next(new AppError('No tour found' ,404));
    }
    res.status(200).json({
        "statuts" :"suceess",
        "timeRequest" :req.requestTime,
        "data" : tour
    })
})


exports.createNewTour= catchAsync(async(req ,res ,next)=>{ 
    const newTour = await tourModel.create({...req.body});
    res.status(201).json({
        "status" :"success",
        "data" :{newTour}
    })
}
)

exports.updateTour = catchAsync(async (req ,res ,next)=>{
    const updatedTour = await tourModel.findByIdAndUpdate(req.params.id ,req.body ,{
        new :true ,
        runValidators:true
    })
    if(!updatedTour) {
        return next(new AppError('No tour found' ,404));
    }
    res.status(200).json({
        "status" :"success",
        updatedTour
    })
})


exports.deleteTour = catchAsync(async (req ,res ,next)=>{
    const deleteTour =await tourModel.findByIdAndDelete(req.params.id);
    if(!deleteTour) {
        return next(new AppError('No tour found' ,404));
    }
    res.status(204).json({
        "status" :"success",
        "data" :null
    })
})

exports.tourStates =catchAsync (async (req , res ,next)=>{
    const states = await tourModel.aggregate(
        [
            {
                $match :{ ratingsAverage: {$gte :4.5}}
            },
            {
                $group :{
                    _id:{ $toUpper:"$difficulty"},
                    numTours :{$sum :1} ,
                    numRatings :{$sum :'$ratingsQuantity'} ,
                    avgRating :{$avg :'$ratingsAverage'},
                    avgPrice :{$avg :'$price'},
                    minPrice:{$min :'$price'},
                    maxPrice:{$max :'$price'}
                }
            },
            {
                $sort :{avgPrice :-1}
            }
            ,{
                $match :{_id :{$ne :"EASY"}}
            }
        ]
    )
    res.status(200).json({
        "status" :"success",
        states
    })
})

exports.getMonthlyPlane =catchAsync(async(req ,res ,next)=>{
    const year =req.params.year *1;
    const plane = await tourModel.aggregate(
        [
            { 
                $unwind :"$startDates"
            },
            {
                $match :{startDates :{$gte :new Date(`${year}-1-1`) , $lte :new Date(`${year}-12-31`)}}
            },
            {
                $group :{
                    _id :{$month :"$startDates"} ,
                    numTours :{$sum :1},
                    tours :{$push :"$name"}
                }
            },
            {
                $addFields:{'month' :'$_id'}
            },
            {
                $project:{_id:0}
            },
            {
                $limit:5
            }
        ]
    )
    res.status(200).json({
        "status" :"success",
        plane
    })
})






