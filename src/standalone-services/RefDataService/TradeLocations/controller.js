const log4js = require('log4js');
const logger = log4js.getLogger("TradeLocationsController");
const TradeLocation = require('./model');

//use controller to interact with DB
module.exports = class TradeLocationController {

    getAllTradeLocations(req, res) {
       console.log('yashodhan');
        TradeLocation.find({}, (err, result) => {
            if(err) {
                console.log("TradeLocation list not found. Got some error - " + err);
            } else {
                res.status(200).json({tradelocations: result});
            }
        })
    }
}
