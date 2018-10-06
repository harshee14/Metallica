const express = require('express');
const ServiceRegistry = require('./ServiceRegistry');
const os = require('os');
const log4js = require('log4js');

const tradeService = require('./services/TradeService').process;
const notificationService = require('./services/NotificationService').process;
const refDataService = require('./services/RefDataService').process;
const marketdataService = require('./services/MarketDataService').process;

const logger = log4js.getLogger("MetallicaServiceRouter");

module.exports.route = (app) => {

    const serviceRegistry = new ServiceRegistry();
    app.set('serviceRegistry', serviceRegistry);


    app.use(express.static('dist'));
    app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
    
    app.put('/service/:serviceName/:port', (req, res, next) => {
        const serviceName = req.params.serviceName;
        const servicePort = req.params.port;
        const serviceIp = req.connection.remoteAddress.includes('::') ? 
            `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

        serviceRegistry.add(serviceName, serviceIp, servicePort);
        res.json({result: `${serviceName} at ${serviceIp}:${servicePort}`});
        
    });


    app.get('/api/trade', (req, res) => {
        const action = {
            service: 'TradeService',
            queryParameters: req.query
        }
        res.json({result: tradeService(action, serviceRegistry, (err, res) => {
            if(err) {
                logger.error("TradeService sent back an error. " + JSON.stringify(err));
            } else {
                return res;
            }
        })});
    });

    app.get('/api/refdata', (req, res) => {
        const action = {
            service: 'RefDataService',
            queryParameters: req.query
        }
        res.json({result: refDataService(action, serviceRegistry, (err, res) => {
            if(err) {
                logger.error("RefDataService sent back an error. " + JSON.stringify(err));
            } else {
                return res;
            }
        })});
    });

    app.get('/api/marketdata', (req, res) => {
        const action = {
            service: 'MarketdataService',
            queryParameters: req.query
        }
        res.json({result: marketdataService(action, serviceRegistry, (err, res) => {
            if(err) {
                logger.error("MarketdataService sent back an error. " + JSON.stringify(err));
            } else {
                return res;
            }
        })});
    });

    app.get('/api/notification', (req, res) => {
        const action = {
            service: 'NotificationService',
            queryParameters: req.query
        }
        res.json({result: notificationService(action, serviceRegistry, (err, res) => {
            if(err) {
                logger.error("NotificationService sent back an error. " + JSON.stringify(err));
            } else {
                return res;
            }
        })});
    });
}