const catchAsync = require('./../utils/catchAsync');
const reviewModel = require('./../models/reviewModel');
const factory = require('./factoryController');



exports.setTourUserIds =(req, res, next) =>{
    if(!req.body.tour){
        req.body.tour =req.params.tourId;
    }
    if(!req.body.user){
        req.body.user =req.user.id;
    }
    next();
}
exports.getAllReviews=factory.getAll(reviewModel);
exports.createNewReview =factory.createOne(reviewModel);
exports.deleteReview = factory.deleteOne(reviewModel);
exports.updateReview =factory.updateOne(reviewModel);
exports.getSingleReview = factory.getSingleOne(reviewModel);