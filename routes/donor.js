const express = require('express');
const routes = require('express').Router();
const path = require('path');
const mongoose = require('mongoose');
const donorController = require('../controllers/donor'); 


routes.get('/register',donorController.getAllDonor);

routes.put('/register/:_id',donorController.putDonorById);

routes.delete('/deletedd/:_id',donorController.deleteDonor);

module.exports = routes;