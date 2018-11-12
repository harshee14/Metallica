const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CounterpartySchema = new mongoose.Schema({
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


//mongoose table name will be Counterparty
module.exports = mongoose.model('Counterparty', CounterpartySchema);
