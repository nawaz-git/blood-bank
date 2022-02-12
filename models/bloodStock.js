const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    'bloodGroup': { type: String },
    'Quantity': { type: Number },
    'price': { type: Number },
    'source': { type: String },
    'Bloodbank': {
        'type': mongoose.Schema.Types.ObjectId,
        'ref': 'Bloodbank',
        'required': true
    }
},
   
    { timestamps: true }
);

const bloodStock = mongoose.model('stockSchema', StockSchema);

module.exports = bloodStock;
