const log4js = require('log4js');
const request = require('superagent');

module.exports.process = (action, registry, cb) => {
        const logger = log4js.getLogger('RefDataService');
        if(!action || !action.service) {
            logger.error("Action not specified for RefDataService");
            return cb(new Error('NoActionError'), null);
        }

        if(!registry)) {
            logger.error("Registry not present.");
            return cb(new Error('NoRegistryError'), null);
        }

        if(!registry.get(action.service)) {
            logger.error("Service not registered.");
            return cb(new Error('ServiceNotRegisteredError', null));
        }

        service = registry.get(action.service);

        return request
            .get(`http://${service.ip}:${service.port}/refdata`)
            .query(action.queryParameters)
            .then(response => {
                if(response.status < 3)
                    return cb(null, response.body);
                else
                    return cb(response, null);
            });
}