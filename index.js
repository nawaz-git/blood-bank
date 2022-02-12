const express = require('express');
const app = express();
const mongoose = require('mongoose');
const apiroutes = require('./routes/api');
const invroutes = require('./routes/inventory');
const bblogin = require("./validation/bblogin");

const cors = require('cors');
require('dotenv/config')


app.use(express.json());
app.use(cors());
app.use("/v1", bblogin);
app.use('/v1', apiroutes);
app.use('/v1', invroutes);

mongoose.connect(process.env.DB_CONNECTION)
 

//Port
app.listen(4000,(req,res)=>{
   console.log('Server is Running')
})