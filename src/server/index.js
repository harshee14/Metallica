const express = require('express');
const log4js = require('log4js');
  log4js.configure('./src/server/logconfig.json');
const router = require('./Router').route;

const logger = log4js.getLogger("console");

const app = express();
router(app);
app.listen(8080, () => logger.info('Listening on port 8080!'));
