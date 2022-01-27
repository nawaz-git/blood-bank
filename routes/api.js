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

// Creating New Blood Bank
routes.post('/createbb', (req, res) => {
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const newbloodbank = new BBModel({
                Sr_No: req.body.Sr_No,
                Blood_Bank_Name:req.body.Blood_Bank_Name ,
                State: req.body.State,
                District: req.body.District,
                City: req.body.City,
                Address:req.body.Address,
                Pincode: req.body.Pincode,
                Contact_No: req.body.Contact_No,
                Mobile:req.body.Mobile,
                Password: hash,
                Helpline: req.body.Helpline,
                Fax: req.body.Fax,
                Email:req.body.Email,
                Website: req.body.Website,
                Nodal_Officer: req.body.Nodal_Officer,
                Contact_Nodal_Officer: req.body.Contact_Nodal_Officer,
                Mobile_Nodal_Officer: req.body.Mobile_Nodal_Officer,
                Email_Nodal_Officer: req.body.Email_Nodal_Officer,
                Qualification_Nodal_Officer: req.body.Qualification_Nodal_Officer,
                Category: req.body.Category,
                Blood_Component_Available: req.body.Blood_Component_Available,
                Apheresis:req.body.Apheresis,
                Service_Time: req.body.Service_Time,
                License_: req.body.License_,
                Date_License_Obtained: req.body.Date_License_Obtained,
                Date_of_Renewal: req.body.Date_of_Renewal,
                Latitude: req.body.Latitude,
                Longitude: req.body.Longitude
            });
            newbloodbank.save();
            res.json(newbloodbank);
        }
    })

    routes.post('/bblogin', (req, res) => {
        BBModel.find({ Mobile: req.body.Mobile })
            .exec()
            .then(user => {
                if (user.length < 1) {
                    return res.status(401).json({
                        msg: 'user doesnt exist'
                    })
                }
                bcrypt.compare(req.body.Password, user[0].Password, (err, result) => {
                    if (!result) {
                        return res.status(400).json({
                            msg: 'password not matched'
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            Mobile: user[0].Mobile ,
                            Blood_Bank_Name:user[0].Blood_Bank_Name ,
                            Email: user[0].Email,
                            Pincode: user[0].Pincode
                        },
                            'token key',
                            { expiresIn: "24h" }
                        );
                        res.status(200).json({
                            Mobile: user[0].Mobile ,
                            Blood_Bank_Name:user[0].Blood_Bank_Name ,
                            Email: user[0].Email,
                            Pincode: user[0].Pincode,
                            token: token
                        })
                    }
                })
            })
            .catch(error => {

                res.status(402).json({
                    error: err
                })
            })
        })
    })

    //updating existing bloodbank
    routes.put('/updatebb/:_id', async (req, res) => {
        const doc = await BBModel.findByIdAndUpdate(req.params._id, { "Email": "lab@gmail.com" })
            .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', ' price', ' source'] });
        doc.save();
        res.json(doc);
    })

    //deleting bloodbank
    routes.delete('/deletebb/:_id', async (req, res) => {
        const doc = await BBModel.findByIdAndDelete(req.params._id);
        res.json(doc);
    })


    module.exports = routes;