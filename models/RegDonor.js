const mongoose = require('mongoose');

const DonorRegister = mongoose.Schema({
    'FirstName': { type: String },
    'LastName': { type: String },
  //  'DOB': { type: Number},
    'Gender': { type: String },
    'phone' : {type : String},
    'BloodGroup': { type: String },
    'Disease': { type: String },
    'last donated': { type: Number},
    'City': { type: String },
    'Pincode': { type: Number }
} );

const DonorDetails = mongoose.model('DonorRegister', DonorRegister);

module.exports = DonorDetails;