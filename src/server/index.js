const express = require('express');
const log4js = require('log4js');
const router = require('./Router').route;

log4js.configure({
    appenders: {
      console: { type: 'console', level: 'debug'},
    },
    categories: {
        default: { appenders: ['console'], level: 'debug' }
      }
});

const logger = log4js.getLogger("MetallicaServiceIndex");

const app = express();
router(app);
app.listen(8080, () => console.log('Listening on port 8080!'));
