const BBModel = require('../models/BloodBankModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DDModel = require('../models/donorform')


exports.getbloodbank =  async (req, res) => {
    try {
        const data = await BBModel.find()
            .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', 'price', 'source'] });
        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

exports.getbypincode =  async (req, res) => {
    const bb = await BBModel.find({ "Pincode": { $eq: `${req.params.pin}` } }, {})
        .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', 'price', 'source'] });
    res.send(bb)
}

exports.getbyid =  async(req, res) => {
    const bbid = await BBModel.findById(req.params._id)
    .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', 'price', 'source'] });
     res.send(bbid)
}

exports.putbloodbank =  async (req, res) => {
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
            .populate({ path: 'bloodStocks', select: ['bloodGroup', 'Quantity', 'price', 'source'] });
        doc.save();
        res.json(doc);
        }
    })
}

exports.postdonorform = async (req, res) => {
    if(!req.body.Gender || !req.body.phone || !req.body.BloodGroup )
    {
        res.json({
            msg:"please enter data"
        })
    }
   const BG = [ 'A+' , 'B+' , 'A-','B-','AB+','AB-','O+', 'O-'];
   if(!BG.includes(req.body.BloodGroup))
   {
       res.status(401).json({
           msg:"please enter valid bloodgroup"
       })
   }
   else
   {
    const form = new DDModel(req.body);
    await form.save();
    res.json(form);
   }
}

exports.deletebb =  async (req, res) => {
    const doc = await BBModel.findByIdAndDelete(req.params._id);
    res.json(doc);
}
