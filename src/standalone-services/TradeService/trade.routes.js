const router = require('express').Router();
const trade = require('express').Router();
const requestLogger = require('morgan');
const log4js = require('log4js');

const TradeController = require('./trade.controller');

module.exports = (app) => {

    const tradeController = new TradeController();

    const logger = log4js.getLogger("TradeServiceRouter");

    router.use(requestLogger);

    router.use('/trade', trade);

    

    /**
     * Get a single trade using the trade ID.
     */
    trade.get('/:tradeId', tradeController.getSingleTrade);

    /**
     * Edit a single trade using the trade ID
     */
    trade.put('/:tradeId', tradeController.editSingleTrade);

    /**
     * Search based on start date, end date, commodity, side, counterparty, location.
     * In case, no search parameter is set, we return all trades of the user.
     */
    trade.get('/', tradeController.searchTrades);

    /**
     * Create a trade with the creator by default in the access list
     */
    trade.post('/', tradeController.createTrade);

    /**
     * Delete a single trade by its trade ID.
     */
    trade.delete('/:tradeId', tradeController.deleteSingleTrade);
    
    app.use('/trade', trade);
};