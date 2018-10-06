const log4js = require('log4js');

const logger = log4js.getLogger("NotificationServiceProcess");

module.exports.process = (req, res, next) => {
    logger.info("Processing: " + JSON.stringify(req.params) + " ? " + JSON.stringify(req.query))
}