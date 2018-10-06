const log4js = require('log4js');
const logger = log4js.getLogger("TradeServiceController");
const Trade = require('./trade.model');

module.exports = class TradeController {

    searchTrades(req, res) {
        const queryParameters = req.query;
        const searchParameters = {};

        console.log(queryParameters);

        if(queryParameters["startDate"] !== null && queryParameters["startDate"] !== "") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$gte"] = new Date(parseInt(queryParameters["startDate"])*1000);
            } else {
                searchParameters["tradeDate"] = {
                    $gte: new Date(parseInt(queryParameters["startDate"])*1000)
                }
            }
        }

        if(queryParameters["endDate"] !== null && queryParameters["endDate"] !== "") {
            if(searchParameters["tradeDate"]) {
                searchParameters["tradeDate"]["$lte"] = new Date(parseInt(queryParameters["endDate"])*1000);
            } else {
                searchParameters["tradeDate"] = {
                    $gte: new Date(parseInt(queryParameters["endDate"])*1000)
                }
            }
        }

        if(queryParameters["commodity"] !== null && queryParameters["commodity"] !== "") {
            searchParameters["commodity"] = queryParameters["commodity"];
        }

        if(queryParameters["buy"] !== null && queryParameters["buy"] !== "") {
            if(searchParameters["side"]) {
                if(searchParameters["side"]["$or"])
                    searchParameters["side"]["$or"].push("BUY");
                else
                    searchParameters["side"]["$or"] = ("BUY");
            } else {
                searchParameters["side"] = {
                    $or: ["BUY"]
                }
            }
        }

        if(queryParameters["sell"] !== null && queryParameters["sell"] !== "") {
            if(searchParameters["side"]) {
                if(searchParameters["side"]["$or"])
                    searchParameters["side"]["$or"].push("SELL");
                else
                    searchParameters["side"]["$or"] = ("SELL");
            } else {
                searchParameters["side"] = {
                    $or: ["SELL"]
                }
            }
        }

        if(queryParameters["counterParty"] !== null && queryParameters["counterParty"] !== "") {
            searchParameters["counterParty"] = queryParameters["counterParty"];
        }

        if(queryParameters["location"] !== null && queryParameters["location"] !== "") {
            searchParameters["location"] = queryParameters["location"];
        }

        console.log(searchParameters);

    }

    getSingleTrade(req, res) {
        return {};
    }

    editSingleTrade(req, res) {
        return {};
    }

    createTrade(req, res) {

        

    }

    deleteSingleTrade(req, res) {
        return {};
    }
}