
const express =require('express');
const userController =require('./../controllers/userController');

const Router =express.Router();

Router.route('/').get(userController.getAllUsers).post(userController.createNewUser);
Router.route('/:id').get(userController.getSingleUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports =Router;