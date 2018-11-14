const express = require('express');
const log4js = require('log4js');
  log4js.configure('./logconfig.json');
const mongoose = require('mongoose');
const request = require('superagent');
const routes = require('./trade.routes');
const configure = require('./configure');
const Counter = require('./counter.model');
const Trade = require('./trade.model');

const fs = require('fs');
const dummyData = JSON.parse(fs.readFileSync('./dummy.json', 'utf8'));

const logger = log4js.getLogger("TradeServiceIndex");
const consoleLogger = log4js.getLogger("console");

const PORT = 3001;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "TradeService";
const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

mongoose.connect(`mongodb://127.0.0.1/trades`, { useNewUrlParser: true }).then((x) => {
    logger.info("Sucessfully connected to MongoDB.");

    Counter.deleteMany({}, () => {
        consoleLogger.debug("Cleared counter database.");
            let data = {
              id: "tradeId",
              seq: 50
            };
            const counter = new Counter(data);
            counter.save((err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Initialized counter data");
                }
            });

    });

    Trade.deleteMany({}, () => {
        consoleLogger.debug("Cleared Trades database.");
        for(let index in dummyData) {
            let row = dummyData[index];
            row.tradeDate = new Date(Number(row.tradeDate)*1000);
            const trade = new Trade(row);
            trade.save((err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    // console.log("Added dummy trade data");
                }
            });
        }
    })
});

const app = express();
configure(app);
routes(app);

app.listen(PORT, () => {
    logger.info(`TradeService listening on ${PORT}`);

    const announce = (timeout) => {
        request.put(`http://${GATEWAY_IP}:${GATEWAY_PORT}/service/${SERVICE_NAME}/${PORT}`, (err, res) => {
            if(err) {
                logger.fatal("Failed to register to gateway. Gateway returned error. " + err);
            } else {
                logger.info("TradeService registered with gateway.")
            }
        })
    }

    setInterval(announce, ANNOUNCE_TIMEOUT);
});
