const express = require('express');
const routes = require('express').Router();
const path = require('path');
const BBModel = require('../models/BloodBankModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

routes.get('/', (req, res) => {
    res.send("Server is Running")
})


routes.get('/blood-bank', async (req, res) => {
    try {
        const data = await BBModel.find()
            .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', ' price', ' source'] });
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
})


// Getting Bloodbank based of Pincode
routes.get('/blood-bank/:pin', async (req, res) => {
    const bb = await BBModel.find({ "Pincode": { $eq: `${req.params.pin}` } }, {})
        .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', ' price', ' source'] });
    res.send(bb)
})
    routes.get('/bb/:_id', async(req, res) => {
        const bbid = await BBModel.findById(req.params._id)
        .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', ' price', ' source'] });
         res.send(bbid)
    })
 
 

    //getting all blood-bank ids
   /* routes.get('/Allid', async (req, res) => {
        const allid = await BBModel.find({}).select(['_id','Blood_Bank_Name'])
        res.status(200).json(allid)
    })*/

    //updating existing bloodbank
    routes.put('/updatebb/:_id', async (req, res) => {
        bcrypt.hash(req.body.Password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                })
            }
            else{
                const doc = await BBModel.findByIdAndUpdate(req.params._id, {
                     "Blood_Bank_Name": req.body.Blood_Bank_Name,
                     "Category": req.body.Category,
                     "Address":req.body.Address,
                     "City":req.body.City,
                     "Contact_No": req.body.Contact_No,
                     "Email":req.body.Email,
                     "Mobile":req.body.Mobile,
                     "Pincode":req.body.Pincode,
                     "State":req.body.State,
                     "Website":req.body.Website,
                     "Password": hash })
                .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', ' price', ' source'] });
            doc.save();
            res.json(doc);
            }
        })
    })

    //deleting bloodbank
    routes.delete('/deletebb/:_id', async (req, res) => {
        const doc = await BBModel.findByIdAndDelete(req.params._id);
        res.json(doc);
    })


    module.exports = routes;