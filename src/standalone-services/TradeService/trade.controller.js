const log4js = require('log4js');
const configure = require('./configure');

const Trade = require('./trade.model');
const Counter = require('./counter.model');

const logger = log4js.getLogger("TradeServiceController");
module.exports = class TradeController {
      searchTrades(req, res) {
        logger.debug('What is my query' , req.query);

        const queryParameters = req.query;
        const searchParameters = {};

        if(queryParameters["startDate"] !== undefined && queryParameters["startDate"] !== "0") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$gte"] = new Date(queryParameters["startDate"]);
            } else {
                searchParameters["tradeDate"] = {
                    $gte: new Date(queryParameters["startDate"])
                }
            }
        }

        if(queryParameters["endDate"] !== undefined && queryParameters["endDate"] !== "0") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$lte"] = new Date(queryParameters["endDate"]);
            } else {
                searchParameters["tradeDate"] = {
                    $lte: new Date(queryParameters["endDate"])
                }
            }
        }

        if(queryParameters["commodity"] !== undefined && queryParameters["commodity"] !== "") {
            searchParameters["commodity"] = {$in : queryParameters["commodity"]};
        }

        if(queryParameters["buy"] !== undefined && queryParameters["buy"] !== "0") {
          logger.debug("is it coming inside?");
            if(searchParameters["side"]) {
                if(searchParameters["side"]["$in"])
                    searchParameters["side"]["$in"].push("BUY");
                else
                    searchParameters["side"]["$in"] = ("BUY");
            } else {
                searchParameters["side"] = {
                    $in: ["BUY"]
                }
            }
        }

        if(queryParameters["sell"] !== undefined && queryParameters["sell"] !== "0") {
            if(searchParameters["side"]) {
                if(searchParameters["side"]["$in"])
                    searchParameters["side"]["$in"].push("SELL");
                else
                    searchParameters["side"]["$in"] = ("SELL");
            } else {
                searchParameters["side"] = {
                    $in: ["SELL"]
                }
            }
        }

        if(queryParameters["counterparty"] !== undefined && queryParameters["counterparty"] !== "") {
            searchParameters["counterparty"] = {$in : queryParameters["counterparty"]};
        }

        if(queryParameters["location"] !== undefined && queryParameters["location"] !== "") {
              searchParameters["location"] = {$in : queryParameters["location"]};
        }

        //searchParameters["trader"] = queryParameters["trader"];
        console.log("query fired, my search parameters are :",searchParameters);
        Trade.find(searchParameters, (err, result) => {
            if(err) {
                console.log("Record not found. Got some error - " + err);
            }
            res.status(200).json({trades: result});

        })

    }

    getSingleTrade(req, res) {
        Trade.find({tradeId: req.query.tradeId}, (err, result) => {
            if(err) {
                console.log("Record not found. Got some error - " + err);
            } else {
                res.status(200).json({trade: result});
            }
        })
    }

    editSingleTrade(req, res) {
       console.log("am I reaching tradecontroller/editSingleTrade",req);
        Trade.update({tradeId: req.params.tradeId}, {$set: req.body}, (err, doc) => {
            if(err) {
                res.status(500).json({error: "Encountered error during updating the trade: " + err});
            } else {
                res.status(200).json(doc);
            }
        })
    }

    createTrade(req, res) {

      let nextCounter = Counter.findOneAndUpdate({id: "tradeId"}, {$inc: { seq: 1 }}, {new: true}, (err, doc) => {
          if(err) {
             logger.debug(doc);
              res.status(500).json({error: "Encountered error during updating the COUNTER: " + err});
          } else {
            logger.debug(doc);
            let nextSeq = doc.seq ;

            const newTrade = new Trade({...req.body, tradeId : nextSeq});
            newTrade.save((err,doc) => {
                if(err) {
                    res.status(500).json({result: "Error while creating trade: " + err});
                } else {
                    res.status(200).json({result: "Successfully created trade" , trade : doc});
                }
            })
          }
      });
    }

    deleteSingleTrade(req, res) {
        Trade.deleteOne({tradeId: req.params.tradeId}, (err, doc) => {
            if(err) {
                res.status(500).json({error: "Encountered error while deleting the trade: " + err});
            } else {
                res.status(200).json(doc);
            }
        })
    }
}
