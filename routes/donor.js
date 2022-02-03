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