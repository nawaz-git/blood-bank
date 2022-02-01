const express = require('express');
const routes = require('express').Router();
const path = require('path');
const DDModel = require('../models/RegDonor');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//getting stored details of donors
routes.get('/register', async (req, res) => {
    const dd = await DDModel.find()
    res.send(dd)
})


//login api fordonor
routes.post('/ddlogin', (req, res) => {
    DDModel.find({phone:req.body.phone})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                msg:'user doesnt exist'
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err, result) =>{
            if(!result)
            {
                return res.status(400).json({
                    msg:'password not matched'
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    phone:user[0].phone,
                    FirstName:user[0].FirstName,
                    BloodGroup:user[0].BloodGroup,
                    Pincode:user[0].Pincode
                },
                 'token key' ,
                 {expiresIn:"24h"}
                );
                res.status(200).json({
                    phone:user[0].phone,
                    FirstName:user[0].FirstName,
                    BloodGroup:user[0].BloodGroup,
                    Pincode:user[0].Pincode,
                    token:token
                })
            }
        })
    })
    .catch(error => {
         
        res.status(402).json({
            error:err
        })
    })
})

//storing signup of donor form in database
routes.post('/ddregister',  (req, res) => {
       bcrypt.hash(req.body.password,10,(err, hash) => {
           if(err)
           {
               return res.status(500).json({
                   error: err
               })
           }
           else{
               const user = new DDModel({
                   _id: new mongoose.Types.ObjectId,
                   FirstName: req.body.FirstName ,
                   LastName: req.body.LastName  ,
                   Gender: req.body.Gender ,
                   phone: req.body.phone ,
                   password : hash ,
                   BloodGroup: req.body.BloodGroup,
                   Disease: req.body.Disease ,
                   lastDonated: req.body.lastDonated,
                   City: req.body.City,
                   Pincode: req.body.Pincode 
               })
               user.save();
               res.json(user);
   
           }
        })
       })
          //  const newDonor = new DDModel(req.body);
         

 

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