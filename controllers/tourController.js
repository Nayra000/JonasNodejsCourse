const tourModel =require('./../models/tourModel');
const ApiFeatures =require(`${__dirname}/../utils/apiFeatures`);


exports.aliasTopTours =(req ,res ,next)=>{
    req.query.sort= '-ratingsAverage,price';
    req.query.limit='5';
    req.query.fields='name,price,ratingsAverage,price,description';
    next();
}

exports.getAllTours = async (req ,res)=>{
    try{
    //execution
    const counts =await tourModel.countDocuments(); //9  //2
    let query =new ApiFeatures("" , req.query).filter().sort().limit().paginate(counts) ;

    const tours = await query.query;
    
    
    /*
    const tour = await tourModel.find().where('duration').equals(5).where('difficulty).equals('easy)
    */
    
    res.status(200).json({
        "statuts" :"suceess",
        "length":tours.length,
        "timeRequest" :req.requestTime,
        "data" :{tours}
    })
}
catch(err){
    res.status(404).json({
        "statuts" :"fail",
        "message" :err.message
    })
}
}


exports.getSingleTour =async (req ,res)=>{
    
try{
    const tour =await tourModel.findById(req.params.id); 
    res.status(200).json({
        "statuts" :"suceess",
        "timeRequest" :req.requestTime,
        "data" : tour
    })
}
catch (err){
    res.status(404).json({
        "statuts" :"fail",
        "message" :err.message
    })
}
}


exports.createNewTour= async(req ,res)=>{ 
    try{
    /* const newTour = new tourModel({...req.body});
    newTour.save(); */
    const newTour = await tourModel.create({...req.body});
    res.status(201).json({
        "status" :"success",
        "data" :{newTour}
    })
    }
    catch(err){
        res.status(400).json({
            "status" :"fail",
            "message" :err.message
        })

    }
}


exports.updateTour = async (req ,res)=>{
   try{
    const updatedTour = await tourModel.findByIdAndUpdate(req.params.id ,req.body ,{
        new :true ,
        runValidators:true
    })
    res.status(200).json({
        "status" :"success",
        updatedTour
    })

   }
   catch(err){
    res.status(400).json({
        "status" :"fail",
        "message" :err.message
    })
   }
    
   
}


exports.deleteTour =async (req ,res)=>{
try{
    await tourModel.findByIdAndDelete(req.params.id);
    res.status(204).json({
        "status" :"success",
        "data" :null
    })
}
catch(err){
    res.status(400).json({
        "status" :"fail",
        "message" :err.message
    })
}  

}

exports.tourStates = async (req , res)=>{
    try{
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
    }
    catch(err){
        res.status(400).json({
            "status" :"fail",
            "message" :err.message
        })
    }  
}

exports.getMonthlyPlane =async(req , res)=>{
    try{
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
    }
    catch(err){
        res.status(400).json({
            "status" :"fail",
            "message" :err.message
        })
    }


}





