const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const TradeSchema = new mongoose.Schema({
    side: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true,
        uppercase: true
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
    counterparty: {
        type: String,
        required: true,
    },
    commodity: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    trader: {
        type: String,
        required: true
    },
    tradeId: {
        type: Number,
        required : true
    }
});

TradeSchema.index({ tradeId: 1 });
module.exports = mongoose.model('Trade', TradeSchema);
