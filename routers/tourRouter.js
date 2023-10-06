const express =require('express');
const tourController =require('./../controllers/tourController')
const Router =express.Router();

/* Router.param('id' ,tourController.checkId)  / */ //These special type pf middleware is called param middleware and execute only for a specail parameter in the url 

Router.route('/top-5-cheapest' ).get(tourController.aliasTopTours ,tourController.getAllTours);
Router.route('/tour-states').get(tourController.tourStates)
Router.route('/').get(tourController.getAllTours).post(tourController.createNewTour);
Router.route('/:id').get(tourController.getSingleTour).patch(tourController.updateTour).delete(tourController.deleteTour);
Router.route('/monthly-plane/:year').get(tourController.getMonthlyPlane);

module.exports =Router;