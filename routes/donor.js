const express = require('express');
const routes = require('express').Router();
const path = require('path');
const DDModel = require('../models/RegDonor');


//getting stored details of donors
routes.get('/register', async (req, res) => {
    const dd = await DDModel.find()
    res.send(dd)
})

//storing signup of donor form in database
routes.post('/register', async (req, res) => {
    const newDonor = new DDModel(req.body);
    await newDonor.save();
    res.json(newDonor);
})

//updating donor details in database
routes.put('/register/:_id', async (req, res) => {
    const ddupdate = await DDModel.findByIdAndUpdate(req.params._id, { "Disease": "yes" });
    ddupdate.save();
    res.json(ddupdate);
})

//deleting donor account
routes.delete('/deletedd/:_id', async (req, res) => {
    const deldd = await DDModel.findByIdAndDelete(req.params._id);
    res.json(deldd);
})

module.exports = routes;