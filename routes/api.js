const express = require('express');
const routes = require('express').Router();
const path = require('path');
const bbcontroller = require('../controllers/bloodbank')

routes.get('/', (req, res) => {
    res.send("Server is Running")
})


routes.get('/blood-bank', bbcontroller.getbloodbank);

routes.get('/blood-bank/:pin', bbcontroller.getbypincode);

routes.get('/bb/:_id', bbcontroller.getbyid);

routes.put('/updatebb/:_id', bbcontroller.putbloodbank);

routes.delete('/deletebb/:_id', bbcontroller.deletebb);

module.exports = routes;