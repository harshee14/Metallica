const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CounterSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    seq: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Counter', CounterSchema);
