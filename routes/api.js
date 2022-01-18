const express = require('express');
const routes = require('express').Router();
const path = require('path');
const BBModel = require('../models/BloodBankModel');

routes.get('/',(req,res) => {
    res.send("Server is Running")
})

// Getting Bloodbank based of Pincode
routes.get('/blood-banks/:pin', async (req, res) => {
    const bb = await BBModel.find({ "Pincode": { $eq: `${req.params.pin}` } }, {})
    res.send(bb)
})

// Creating New Blood Bank
routes.post('/createbb', async (req, res) => {
    const newbloodbank = new BBModel(req.body);
    await newbloodbank.save();
    res.json(newbloodbank);
})

//updating existing bloodbank
routes.put('/updatebb/:_id', async (req, res) => {
    const doc = await BBModel.findByIdAndUpdate(req.params._id, { "Email": "lab@gmail.com" });
    doc.save();
    res.json(doc);
})

//deleting bloodbank
routes.delete('/deletebb/:_id', async (req, res) => {
    const doc = await BBModel.findByIdAndDelete(req.params._id);
    res.json(doc);
})


module.exports = routes;