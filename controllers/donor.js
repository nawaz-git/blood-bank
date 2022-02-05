const DDModel = require('../models/RegDonor');

exports.getAllDonor = async (req, res) => {
    const dd = await DDModel.find()
    res.send(dd)
}

exports.putDonorById = async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else 
        {
         const ddupdate = await DDModel.findByIdAndUpdate(req.params._id, {
                'FirstName': req.body.FirstName,
                'LastName': req.body.LastName,
                'Gender': req.bod.Gender,
                'phone': req.body.phone,
                'password': hash,
                'BloodGroup': req.body.BloodGroup,
                'Disease': req.body.Disease,
                'lastDonated': req.body.lastDonated,
                'City': req.body.City,
                'Pincode': req.body.Pincode
           });
        }
        ddupdate.save();
        res.json(ddupdate);
    })
}

exports.deleteDonor = async (req, res) => {
    const deldd = await DDModel.findByIdAndDelete(req.params._id);
    res.json(deldd);
}