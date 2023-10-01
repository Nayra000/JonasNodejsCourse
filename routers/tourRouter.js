const express =require('express');
const tourController =require('./../controllers/tourController')
const Router =express.Router();

Router.param('id' ,tourController.checkId)  //These special type pf middleware is called param middleware and execute only for a specail parameter in the url 


Router.route('/').get(tourController.getAllTours).post(tourController.checkBody,tourController.createNewTour);
Router.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);


module.exports =Router;