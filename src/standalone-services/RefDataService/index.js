const express = require('express');
const log4js = require('log4js');
const request = require('superagent');

const logger = log4js.getLogger("RefDataServiceIndex");
logger.level = 'debug';

const process = require('./process').process;

const port = 3004;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "RefDataService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

const app = express();

app.get('/refdata', (req, res) => {
    process(req, (err, res) => {
        if(err)
            res.err({result: "FAIL"});
        else
            res.json({result: "OK"});
    })

})

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
