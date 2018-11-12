const log4js = require('log4js');
const request = require('superagent');

module.exports.process = (action, registry, cb) => {
        const logger = log4js.getLogger('TradeService');
        if(!action || !action.service) {
            logger.error("Action not specified for TradeService");
            return cb(new Error('NoActionError'), null);
        }

        if(!registry){
            logger.error("Registry not present.");
            return cb(new Error('NoRegistryError'), null);
        }

        if(!registry.get(action.service)) {
            logger.error("Service not registered.");
            return cb(new Error('ServiceNotRegisteredError', null));
        }

        service = registry.get(action.service);
        logger.debug('what is my action showing?',action);
        switch(action.intent) {
            case "searchTrades":
                return request
                    .get(`http://${service.ip}:${service.port}/trade`)
                    .query(action.queryParameters)
                    .then(response => cb(response));
            break;
            case "getTrade":
                return request
                    .get(`http://${service.ip}:${service.port}/trade/${action.queryParameters.tradeId}`)
                    .query(action.queryParameters)
                    .then(response => cb(response));
            break;
            case "editTrade":
                return request
                    .put(`http://${service.ip}:${service.port}/trade/${action.queryParameters.tradeId}`)
                    .set('Content-Type', 'application/json')
                    .send(action.body)
                    .then(response => cb(response));
            break;

            case "createTrade":
                console.log(action.body);
                return request
                    .post(`http://${service.ip}:${service.port}/trade/`)
                    .set('Content-Type', 'application/json')
                    .send(action.body)
                    .then(response => cb(response))
                    .catch(err => {
                        console.log(err);
                    });
            break;
            case "deleteTrade":
                return request
                    .delete(`http://${service.ip}:${service.port}/trade/${action.queryParameters.tradeId}`)
                    .then(response => cb(response));
            break;
        }


}
