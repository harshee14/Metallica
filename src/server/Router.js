const express = require('express');
const ServiceRegistry = require('./ServiceRegistry');
const os = require('os');
const log4js = require('log4js');
const bodyParser = require('body-parser');

const tradeService = require('./services/TradeService').process;
const notificationService = require('./services/NotificationService').process;
const refDataService = require('./services/RefDataService').process;
const marketdataService = require('./services/MarketDataService').process;
const cors = require('cors')

const logger = log4js.getLogger("MetallicaServiceRouter");

module.exports.route = (app) => {

    const serviceRegistry = new ServiceRegistry();
    app.set('serviceRegistry', serviceRegistry);


    app.use(express.static('dist'));
    app.use(cors({credentials: true, origin: true}));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

    app.put('/service/:serviceName/:port', (req, res, next) => {
        const serviceName = req.params.serviceName;
        const servicePort = req.params.port;
        const serviceIp = req.connection.remoteAddress.includes('::') ?
            `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

        serviceRegistry.add(serviceName, serviceIp, servicePort);
        res.json({result: `${serviceName} at ${serviceIp}:${servicePort}`});

    });


    /**
     * Available APIs:
     * - GET /api/trade/searchTrades?buy={0,1}&sell={0,1}&startDate={new Date()}&endDate={new Date()}&commodity={commodityId}&counterParty={counterParty}&location={location}
     * - GET /api/trade/getTrade?tradeId={tradeId}
     * - PUT /api/trade/editTrade?tradeId={tradeId} <TRADE BODY>
     * - POST /api/trade/createTrade <TRADE BODY>
     * - DELETE /api/trade/deleteTrade?tradeId={tradeId}
     */
    app.all('/api/trade/:intent', (req, res) => {
        const action = {
            service: 'TradeService',
            queryParameters: req.query,
            intent: req.params.intent,
            body: req.body
        }
        logger.debug('what does my action look',action);
        tradeService(action, serviceRegistry, (response) => {
            res.status(200).json(response.body);
        });
    });

    app.get('/api/refdata', (req, res) => {
        const action = {
            service: 'RefDataService',
            queryParameters: req.query
        }
        refDataService(action, serviceRegistry, (err, response) => {
            if(err) {
                logger.error("RefDataService sent back an error. " + JSON.stringify(err));
            } else {
                res.status(200).json(response);
            }
        });
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
