const BSModel = require('../models/bloodStock');
const BBModel = require('../models/BloodBankModel');
const { json } = require('body-parser');
const Circular = require('circular-json');

exports.getBloodStocks = async (req, res) => {
    const dd = await BSModel.find()
    res.send(dd)
}

exports.filterBGroup = async (req, res) => {
    try {
    const bf = await BSModel.find({"bloodGroup" : { $eq: `${req.params.bloodgroup}`}}, {})
    res.send(bf)
    console.log(bf)
    }
    catch{
       console.error();
    }
}

exports.postBStocks =  async (req, res) => {
   const BG = [ 'A+' , 'B+' , 'A-','B-','AB+','AB-','O+', 'O-'];
   if(!BG.includes(req.body.bloodGroup))
   {
       res.status(401).json({
           msg:"please enter valid bloodgroup"
       })
   }
    const newStock = new BSModel(req.body);
     await newStock.save();
   res.json(newStock);
}

exports.putBStocks = async (req, res) => {
    const BSupdate = await BSModel.findByIdAndUpdate(req.params._id, {});
    BSupdate.save();
    res.json(BSupdate);
}

exports.deleteBStocks =  async (req, res) => {
    const delBS = await BSModel.findByIdAndDelete(req.params._id);
    res.json(delBS);
}