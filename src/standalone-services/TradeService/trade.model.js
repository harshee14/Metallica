const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TradeSchema = new mongoose.Schema({
    side: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tradeDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["OPEN", "NOMINATED"]
    },
    counterpartyId: {
        type: String,
        required: true,
    },
    commodityId: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    accessList: {
        type: [String],
        validate: [accessListLowerBound, '{PATH} should have atleast one member']
    },
    tradeId: {
        type: String,
        required: true,
        unique: true
    }
});

function accessListLowerBound(accessList) {
    return accessList.length > 0;
}

module.exports = mongoose.model('Trade', TradeSchema);