const mongoose = require('mongoose');

const StockSchema = mongoose.Schema({
    'bloodGroup' : {type : String},
    'Quantity' : { type : Number},
    'price' : {type : Number},
    'source' : {type : String}
});

const bloodStock = mongoose.model('stockSchema', StockSchema);

module.exports = bloodStock;
