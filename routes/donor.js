const express = require('express');
const routes = require('express').Router();
const donorController = require('../controllers/donor');


routes.get('/donors', donorController.getdonors)

routes.post('/donorform', donorController.postdonorform)

routes.delete('/deletedonor/:_id', donorController.deletedonor)

module.exports = routes;