
const express =require('express');
const userController =require('./../controllers/userController');
const authController = require('./../controllers/authController');

const Router =express.Router();

Router.post('/signup',authController.singup);
Router.post('/singin' ,authController.signin)

Router.patch('/updatePassword' ,authController.protect,authController.updatePassword);
Router.patch('/updateMe' ,authController.protect,userController.updateMe);
Router.delete('/deleteMe' ,authController.protect,userController.deleteMe);

Router.post('/forgotPassword' ,authController.forgotPassword);
Router.patch('/resetPassword/:token' ,authController.resetPassword);

//Below routes is necessary for admin
Router.route('/').get(userController.getAllUsers).post(userController.createNewUser);
Router.route('/:id').get(userController.getSingleUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports =Router;