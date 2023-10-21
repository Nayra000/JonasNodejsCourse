
const express =require('express');
const userController =require('./../controllers/userController');
const authController = require('./../controllers/authController');

const Router =express.Router();  



Router.post('/signup',authController.singup);
Router.post('/singin' ,authController.signin);
Router.post('/forgotPassword' ,authController.forgotPassword);
Router.patch('/resetPassword/:token' ,authController.resetPassword);



//Router acts as a small express app so I can use globla middelware
//Protecting all coming routes
Router.use(authController.protect);

Router.patch('/updatePassword' ,authController.updatePassword);
Router.patch('/updateMe' ,userController.updateMe);
Router.delete('/deleteMe' ,userController.deleteMe);
Router.get('/me' ,userController.getMe ,userController.getSingleUser)



Router.use(authController.restrictTo('admin'));
//Below routes is necessary for admin
Router.route('/').get(userController.getAllUsers).post(userController.createNewUser);
Router.route('/:id').get(userController.getSingleUser).patch(userController.updateUser).delete(userController.deleteUser);
module.exports =Router;