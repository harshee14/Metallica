const ServiceRegistry = require('./ServiceRegistry');

module.exports.route = (app) => {

    const serviceRegistry = new ServiceRegistry();
    app.set('serviceRegistry', serviceRegistry);


    app.use(express.static('dist'));
    app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
    
    app.put('/service/:serviceName/:port', (req, res, next) => {
        const serviceName = req.params.serviceName;
        const servicePort = req.params.port;
        const serviceIp = req.connection.remoteAddress.includes('::') ? 
            `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

        serviceRegistry.add(serviceName, serviceIp, servicePort);
        res.json({result: `${serviceName} at ${serviceIp}:${servicePort}`});
        
    });
}