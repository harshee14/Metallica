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

/***
 * To generate dummy data:
 * https://www.json-generator.com/#
[
    '{{repeat(40)}}',
    {

      side: '{{random("BUY", "SELL")}}',
      quantity: '{{integer(20, 40)}}',
      price: '{{integer(200, 700)}}',
      tradeDate: '{{integer(1541020449, 1572556448)}}',
      status: '{{random("OPEN", "NOMINATED")}}',
      counterpartyId: function makeid() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          for (var i = 0; i < 4; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
      },
      commodityId: '{{random("IRON", "GOLD", "ALU", "PLAT", "SILVER")}}',
      location: '{{city()}}',
      accessList: ['{{repeat(1,7)}}','{{email(true)}}'],
      tradeId: function tradeId() {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
          for (var i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
      }
    }
  ]
*/
