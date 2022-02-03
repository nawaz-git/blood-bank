const express = require('express');
const routes = require('express').Router();
const path = require('path');
const BSModel = require('../models/bloodStock');

//getting stored details of bloodstock
routes.get('/bloodstocks', async (req, res) => {
    const dd = await BSModel.find()
    res.send(dd)
})

//Getting details based on bloodgroup
routes.get('/filter/:bloodgroup', async (req, res) => {
    try {
    const bf = await BSModel.find({"bloodGroup" : { $eq: `${req.params.bloodgroup}`}}, {})
    res.send(bf)
    }
    catch{
       console.error();
    }
})


//storing bloodstock of donor form in database
routes.post('/createbs', async (req, res) => {
    const newStock = new BSModel(req.body);
    await newStock.save();
    res.json(newStock);
})

//updating bloodstock details in database
routes.put('/updatebs/:_id', async (req, res) => {
    const BSupdate = await BSModel.findByIdAndUpdate(req.params._id, {"bloodGroup" : "a"});
    BSupdate.save();
    res.json(BSupdate);
})

//deleting bloodstock account
routes.delete('/deletebs/:_id', async (req, res) => {
    const delBS = await BSModel.findByIdAndDelete(req.params._id);
    res.json(delBS);
})

module.exports = routes;