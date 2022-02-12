const mongoose = require('mongoose');

const DonorForm = mongoose.Schema({
    'FullName': { type: String },
    'Gender': { type: String },
    'phone' : {type : String},
    'BloodGroup': { type: String },
    'City': { type: String },
    'Pincode': { type: Number },
    'Bloodbank': {
      'type': mongoose.Schema.Types.ObjectId,
      'ref': 'Blood-Bank',
      'required': true
  }
}, { timestamps: true } );

const DonorDetails = mongoose.model('DonorForm', DonorForm);

module.exports = DonorDetails;