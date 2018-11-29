const express = require('express');
var amqp = require('amqplib/callback_api');

const log4js = require('log4js');
  log4js.configure('./logconfig.json');
const request = require('superagent');
const configure = require('./configure');

const logger = log4js.getLogger("MarketdataServiceIndex");
logger.level = 'debug';

const process = require('./process').process;

const port = 3003;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "MarketdataService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

let amqpConn = null;


const app = express();
configure(app);

app.get('/marketdata', (req, res) => {
    process(req, (err, res) => {
        if(err)
            res.err({result: "FAIL"});
        else
            res.json({result: "OK"});
    })

})

app.listen(port, () => {
    logger.info(`MarketdataService listening on ${port}`);

    const announce = (timeout) => {
        request.put(`http://${GATEWAY_IP}:${GATEWAY_PORT}/service/${SERVICE_NAME}/${port}`, (err, res) => {
            if(err) {
                logger.fatal("Failed to register to gateway. Gateway returned error. " + err);
            } else {
                logger.info("MarketdataService registered with gateway.")
            }
        })
    }



    const publish = (timeout) =>
    {

      if(amqpConn)
      {
            amqpConn.createChannel(function(err, ch) {
              var q = 'hello';
              ch.assertQueue(q, {durable: false});
              let msg = getUpdatedPrice();
              ch.sendToQueue(q, new Buffer(JSON.stringify(msg)));
          });
      }

      else {
        amqp.connect('amqp://localhost', (err, conn) => {
          if(err)
              amqpConn = err;
           else
              amqpConn = conn;
        });
      }
    }

    setInterval(announce, ANNOUNCE_TIMEOUT);
    setInterval(publish, 5000);

});

function getUpdatedPrice() {
    // after integration prices will come from backend
    var metalAndPrices =  [
        {key:'Iron',price:Math.round(23 * (Math.random()-0.5))},
        {key:'Gold',price:Math.round(100 * (Math.random()-0.5))},
        {key:'Silver',price:Math.round(25 * (Math.random()-0.5))},
        {key:'Alu',price:Math.round(46 * (Math.random()-0.5))},
        {key:'Platinum',price:Math.round(15 * (Math.random()-0.5))},
        {key:'Uranium',price:Math.round(87 * (Math.random()-0.5))}
    ];
    return metalAndPrices ;
}
