const express = require('express');
const log4js = require('log4js');
  log4js.configure('./logconfig.json');
const request = require('superagent');
const configure = require('./configure');
const routes = require('./routes');
const Counterparty = require('./Counterparties/model');
const Commodity = require('./Commodities/model');
const TradeLocation = require('./TradeLocations/model');
const mongoose = require('mongoose');

const fs = require('fs');
const cpdummyData = JSON.parse(fs.readFileSync('./Counterparties/dummy.json', 'utf8'));
const cdummyData = JSON.parse(fs.readFileSync('./Commodities/dummy.json', 'utf8'));
const tldummyData = JSON.parse(fs.readFileSync('./TradeLocations/dummy.json', 'utf8'));


const logger = log4js.getLogger("RefDataServiceIndex");

const port = 3004;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "RefDataService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

mongoose.connect(`mongodb://127.0.0.1/refdata`, { useNewUrlParser: true }).then((x) => {
    logger.info("Sucessfully connected to MongoDB.");
    Counterparty.deleteMany({}, () => {
        console.log("Cleared Counterparties table.");
        for(let index in cpdummyData) {
            let row = cpdummyData[index];
            const counterparty = new Counterparty(row);
            counterparty.save((err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added dummy counterparty data");
                }
            });
        }
    })

    Commodity.deleteMany({}, () => {
        console.log("Cleared Commodities table.");
        for(let index in cdummyData) {
            let row = cdummyData[index];
            const commodity = new Commodity(row);
            commodity.save((err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added dummy commodity data");
                }
            });
        }
    })

    TradeLocation.deleteMany({}, () => {
        console.log("Cleared TradeLocation table.");
        for(let index in tldummyData) {
            let row = tldummyData[index];
            const tradelocation = new TradeLocation(row);
            tradelocation.save((err, docs) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("Added dummy tradelocation data");
                }
            });
        }
    })
});

const app = express();
configure(app);
routes(app);

app.listen(port, () => {
    logger.info(`RefDataService listening on ${port}`);

    const announce = (timeout) => {
        request.put(`http://${GATEWAY_IP}:${GATEWAY_PORT}/service/${SERVICE_NAME}/${port}`, (err, res) => {
            if(err) {
                logger.fatal("Failed to register to gateway. Gateway returned error. " + err);
            } else {
                logger.info("RefDataService registered with gateway.")
            }
        })
    }

    setInterval(announce, ANNOUNCE_TIMEOUT);
});
