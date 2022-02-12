const mongoose = require('mongoose');

const BloodBank = mongoose.Schema({
    "Sr_No": { type: Number },
    "Blood_Bank_Name": { type: String },
    "State": { type: String },
    "District": { type: String },
    "City": { type: String },
    "Address": { type: String },
    "Pincode": { type: Number },
    "Contact_No": { type: String },
    "Mobile": {type: String },
    "password": {type: String},
    "Helpline": { type: Number },
    "Fax": { type: String },
    "Email": { type: String },
    "Website": { type: String },
    "Nodal_Officer": { type: String },
    "Contact_Nodal_Officer": { type: String },
    "Mobile_Nodal_Officer": {type:  Number },
    "Email_Nodal_Officer": { type: String },
    "Qualification_Nodal_Officer": { type: String },
    "Category": { type: String },
    "Blood_Component_Available": { type: String },
    "Apheresis": { type: String },
    "Service_Time": { type: String },
    "License_#": { type: String },
    "Date_License_Obtained": { type: String },
    "Date_of_Renewal": { type: String },
    "Latitude": { type: Number },
    "Longitude": { type: Number }
  },{strict: false})

const DonorForm = mongoose.Schema({
    'FullName': { type: String },
    'Gender': { type: String },
    'phone' : {type : String},
    'BloodGroup': { type: String },
    'City': { type: String },
    'Pincode': { type: Number },
    'Bloodbank': {
      'type': mongoose.Schema.Types.ObjectId,
      'ref': 'BloodBank',
      'required': true
  }
} );

  BloodBank.virtual('DonorDetails', {
    'ref' : 'DonorForm',
    'localField' : '_id',
    'foreignField' : 'Bloodbank'
  });

  BloodBank.virtual('bloodStocks', {
    'ref' : 'stockSchema',
    'localField' : '_id',
    'foreignField' : 'Bloodbank'
  });

  BloodBank.set('toObject', {virtuals: true});
  BloodBank.set('toJSON', {virtuals: true});

const bloodBankModel = mongoose.model("BloodBank",BloodBank)
module.exports = bloodBankModel;

const DonorDetails = mongoose.model('DonorForm', DonorForm);
module.exports = DonorDetails;