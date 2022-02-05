const express = require('express');
const routes = require('express').Router();
const path = require('path');
const invController = require('../controllers/inventory')


routes.get('/bloodstocks', invController.getBloodStocks);

routes.get('/filter/:bloodgroup', invController.filterBGroup );

routes.post('/createbs', invController.postBStocks);

routes.put('/updatebs/:_id', invController.putBStocks );

routes.delete('/deletebs/:_id',invController.deleteBStocks);

module.exports = routes;