const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommoditySchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        uppercase: true
    },
    name: {
        type: String,
        required: true
    }
});


//mongoose table name will be Commodity
module.exports = mongoose.model('Commodity', CommoditySchema);
