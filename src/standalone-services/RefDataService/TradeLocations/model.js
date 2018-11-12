const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TradeLocationSchema = new mongoose.Schema({
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


//mongoose table name will be TradeLocation
module.exports = mongoose.model('TradeLocation', TradeLocationSchema);
