const router = require('express').Router();
const log4js = require('log4js');

const CommodityController = require('./Commodities/controller');
const TradeLocationController = require('./TradeLocations/controller');
const CounterpartyController = require('./Counterparties/controller');

module.exports = (app) => {

    const commodityController = new CommodityController();
    const tradeLocationController = new TradeLocationController();
    const counterPartyController = new CounterpartyController();

    const logger = log4js.getLogger("RefDataServiceRouter");

    /**
     * Get a single trade using the trade ID.
     */
    router.get('/commodity', commodityController.getAllCommodities);
    router.get('/tradelocation', tradeLocationController.getAllTradeLocations);
    router.get('/counterparty', counterPartyController.getAllCounterparties);


    app.use('/', router);
};
