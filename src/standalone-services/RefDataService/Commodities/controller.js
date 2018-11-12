const log4js = require('log4js');
const logger = log4js.getLogger("CommodityController");
const Commodity = require('./model');

//use controller to interact with DB
module.exports = class CommodityController {

    getAllCommodities(req, res) {
       console.log('yashodhan');
        Commodity.find({}, (err, result) => {
            if(err) {
                console.log("Commodity list not found. Got some error - " + err);
            } else {
                res.status(200).json({commodities: result});
            }
        })
    }
}
