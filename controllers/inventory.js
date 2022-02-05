const BSModel = require('../models/bloodStock');

exports.getBloodStocks = async (req, res) => {
    const dd = await BSModel.find()
    res.send(dd)
}

exports.filterBGroup = async (req, res) => {
    try {
    const bf = await BSModel.find({"bloodGroup" : { $eq: `${req.params.bloodgroup}`}}, {})
    res.send(bf)
    }
    catch{
       console.error();
    }
}

exports.postBStocks =  async (req, res) => {
    const newStock = new BSModel(req.body);
    await newStock.save();
    res.json(newStock);
}

exports.putBStocks = async (req, res) => {
    const BSupdate = await BSModel.findByIdAndUpdate(req.params._id, {"bloodGroup" : "a"});
    BSupdate.save();
    res.json(BSupdate);
}

exports.deleteBStocks =  async (req, res) => {
    const delBS = await BSModel.findByIdAndDelete(req.params._id);
    res.json(delBS);
}