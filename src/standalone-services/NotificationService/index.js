const express = require('express');
const log4js = require('log4js');
  log4js.configure('./logconfig.json');
const request = require('superagent');
const configure = require('./configure');

const logger = log4js.getLogger("NotificationServiceIndex");
logger.level = 'debug';

const process = require('./process').process;

const port = 3002;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "NotificationService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

const app = express();
configure(app);

app.get('/notification', (req, res) => {
    process(req, (err, res) => {
        if(err)
            res.err({result: "FAIL"});
        else
            res.json({result: "OK"});
    })

})

app.listen(port, () => {
    logger.info(`NotificationService listening on ${port}`);

    const announce = (timeout) => {
        request.put(`http://${GATEWAY_IP}:${GATEWAY_PORT}/service/${SERVICE_NAME}/${port}`, (err, res) => {
            if(err) {
                logger.fatal("Failed to register to gateway. Gateway returned error. " + err);
            } else {
                logger.info("NotificationService registered with gateway.")
            }
        })
    }

    setInterval(announce, ANNOUNCE_TIMEOUT);
});
