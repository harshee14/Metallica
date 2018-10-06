const log4js = require('log4js');

class ServiceRegistry {
    constructor() {
        this._services = [];
        this._timeout = 30;
        this.logger = log4js.getLogger();
    }

    add(service, ip, port) {
        const key = service + "/" + ip + "/" + port;
        if(!this._services[key]) {
            this._services[key] = {};
            this._services[key].ip = ip;
            this._services[key].port = port;
            this._services[key].service = service;
            this._services[key].timestamp = Math.floor(new Date() / 1000);

            this.logger.info(`Added service ${service} on ${ip}:${port}`);
            this._cleanup();
            return;
        }

        this._services[key].timestamp = Math.floor(new Date() / 1000);
        this.logger.info(`Updated service ${service} on ${ip}:${port}`);
        this._cleanup();
    }

    remove(service, ip, port) {
        const key = service + "/" + ip + "/" + port;
        delete this._services[key];
    }

    get(service) {
        this._cleanup();
        for(let key in this._services) {
            if(this._services[key].service == service) return this._services[key];
        }
        return null;
    }

    _cleanup() {
        const now = Math.floor(new Date() / 1000);

        for(let key in this._services) {
            if(this._services[key].timestamp + this._timeout < now) {
                this.logger.info(`Removed service ${service} on ${ip}:${port}`);
                delete this._services[key];
            }
        }
    }

}

module.exports = ServiceRegistry;