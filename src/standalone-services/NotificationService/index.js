const express = require('express');
const log4js = require('log4js');
var amqp = require('amqplib/callback_api');
  log4js.configure('./logconfig.json');
const request = require('superagent');
const configure = require('./configure');
const http = require("http");
const socketIO = require("socket.io");

const logger = log4js.getLogger("NotificationServiceIndex");
logger.level = 'debug';

const process = require('./process').process;

const port = 3002;
const ANNOUNCE_TIMEOUT = 5000;
const SERVICE_NAME = "NotificationService";

const GATEWAY_IP = "127.0.0.1";
const GATEWAY_PORT = "8080";

let amqpConn = null;

const app = express();
configure(app);
const server = http.createServer(app);
const io = socketIO(server);

server.listen(port, () => {
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

io.on("connection", socket => {
  console.log("New client socket created");
  consumeMessage(io);
});


var consumeMessage = (io) =>
{
  console.log("what is my amqpconn",amqpConn);
  if(amqpConn)
  {
        amqpConn.createChannel(function(err, ch) {
          var q = 'hello';
          ch.assertQueue(q, {durable: false});
          ch.consume(q, function(msg){
            console.log("Recieved message : ", JSON.parse(msg.content));
              io.emit('Prices',JSON.parse(msg.content));
          });

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
