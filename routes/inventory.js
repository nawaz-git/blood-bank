const express = require('express');
const routes = require('express').Router();
const path = require('path');
const BSModel = require('../models/bloodStock');

//getting stored details of donors
routes.get('/bloodstocks', async (req, res) => {
    const dd = await BSModel.find()
    res.send(dd)
})

//storing signup of donor form in database
routes.post('/createbs', async (req, res) => {
    const newStock = new BSModel(req.body);
    await newStock.save();
    res.json(newStock);
})

//updating donor details in database
routes.put('/updatebs/:_id', async (req, res) => {
    const BSupdate = await BSModel.findByIdAndUpdate(req.params._id, {});
    BSupdate.save();
    res.json(ddupdate);
})

//deleting donor account
routes.delete('/deletebs/:_id', async (req, res) => {
    const delBS = await BSModel.findByIdAndDelete(req.params._id);
    res.json(delBS);
})

module.exports = routes;