const log4js = require('log4js');
const logger = log4js.getLogger("TradeServiceController");
const Trade = require('./trade.model');

module.exports = class TradeController {

    searchTrades(req, res) {
        const queryParameters = req.query;
        const searchParameters = {};

        if(queryParameters["startDate"] !== undefined && queryParameters["startDate"] !== "") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$gte"] = new Date(parseInt(queryParameters["startDate"])*1000);
            } else {
                searchParameters["tradeDate"] = {
                    $gte: new Date(parseInt(queryParameters["startDate"])*1000)
                }
            }
        }

        if(queryParameters["endDate"] !== undefined && queryParameters["endDate"] !== "") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$lte"] = new Date(parseInt(queryParameters["endDate"])*1000);
            } else {
                searchParameters["tradeDate"] = {
                    $gte: new Date(parseInt(queryParameters["endDate"])*1000)
                }
            }
        }

        if(queryParameters["commodity"] !== undefined && queryParameters["commodity"] !== "") {
            searchParameters["commodity"] = queryParameters["commodity"];
        }

        if(queryParameters["buy"] !== undefined && queryParameters["buy"] !== "") {
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

        if(queryParameters["sell"] !== undefined && queryParameters["sell"] !== "") {
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

        if(queryParameters["counterParty"] !== undefined && queryParameters["counterParty"] !== "") {
            searchParameters["counterParty"] = queryParameters["counterParty"];
        }

        if(queryParameters["location"] !== undefined && queryParameters["location"] !== "") {
            searchParameters["location"] = queryParameters["location"];
        }

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
            }
            res.status(200).json({trade: result});
        })
    }

    editSingleTrade(req, res) {
        Trade.update({tradeId: req.params.tradeId}, {$set: req.body}, (err, doc) => {
            res.status(200).json(doc);
        })
    }

    createTrade(req, res) {
        const newTrade = new Trade(req.body);
        newTrade.save((err) => {
            if(err) res.status(500).json({result: "Error"});
            res.status(200).json({result: "Successfully created trade"});
        })
    }

    deleteSingleTrade(req, res) {
        return {};
    }
}