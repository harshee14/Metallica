const express = require('express');
const log4js = require('log4js');
const os = require('os');
const router = require('./Router');

const logger = log4js.getLogger();
logger.level = 'debug';

const app = express();
router(app);
app.listen(8080, () => console.log('Listening on port 8080!'));
