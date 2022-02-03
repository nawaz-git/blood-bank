const express = require('express');
const routes = require('express').Router();
const path = require('path');
const DDModel = require('../models/RegDonor');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

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
routes.post('/ddregister', async (req, res) => {
    const val = await BBModel.findOne({phone: req.body.phone})
    {
     if (val)
     {
        return res.status(401).json({
            msg :"number already exists"
        })
     }
    }
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

       module.exports = routes;