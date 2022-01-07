const express = require('express');
const app = express();
const mongoose = require('mongoose');
const BBModel = require('./models/BloodBankModel')
const cors = require('cors');
require('dotenv/config')


app.use(express.json())
app.use(cors())


mongoose.connect(process.env.DB_CONNECTION)


app.get('/',(req,res)=>{
    res.send("Server is Running")
})

// Getting Bloodbank based of Pincode
app.get('/blood-banks/:pin', async (req, res)=>{
    const bb = await BBModel.find({"Pincode":{$eq:`${req.params.pin}`}},{})
    res.send(bb)
})

// Creating New Blood Bank
app.post('/createbb', async (req,res)=>{
    const newbloodbank = new BBModel(req.body);
    await newbloodbank.save();
    res.json(newbloodbank)
})

//Port
app.listen(4000,(req,res)=>{
   console.log('Server is Running')
})