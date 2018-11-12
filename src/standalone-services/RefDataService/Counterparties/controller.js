const log4js = require('log4js');
const logger = log4js.getLogger("CounterpartyController");
const Counterparty = require('./model');

//use controller to interact with DB
module.exports = class CounterpartyController {

    getAllCounterparties(req, res) {
       console.log('yashodhan');
        Counterparty.find({}, (err, result) => {
            if(err) {
                console.log("Counterparty list not found. Got some error - " + err);
            } else {
                res.status(200).json({counterparties: result});
            }
        })
    }
}
