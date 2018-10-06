const express = require('express');
const log4js = require('log4js');
const request = require('superagent');

const logger = log4js.getLogger("TradeServiceIndex");
logger.level = 'debug';

const process = require('./process').process;

const port = 3001;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "TradeService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

const app = express();

app.get('/trade', (req, res) => {
    process(req, (err, res) => {
        if(err)
            res.err({result: "FAIL"});
        else
            res.json({result: "OK"});
    })

})

app.listen(port, () => {
    logger.info(`TradeService listening on ${port}`);
    
    const announce = (timeout) => {
        request.put(`http://${GATEWAY_IP}:${GATEWAY_PORT}/service/${SERVICE_NAME}/${port}`, (err, res) => {
            if(err) {
                logger.fatal("Failed to register to gateway. Gateway returned error. " + err);
            } else {
                logger.info("TradeService registered with gateway.")
            }
        })
    }

    setInterval(announce, ANNOUNCE_TIMEOUT);
});
