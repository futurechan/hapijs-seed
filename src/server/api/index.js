exports.register = (server, options, next) => {

    server.route(require('./profile'));
    server.route(require('./customers'));

    next();
};

exports.register.attributes = {
    name: 'api',
    version: '0.0.0'
};