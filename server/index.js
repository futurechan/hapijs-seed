var Hapi = require('hapi')
    , config = require('./config');

var server = new Hapi.Server();
server.connection({
    port: process.env.PORT || config.PORT,
    router: {
        isCaseSensitive:false,
        stripTrailingSlash: true
    },
    routes: {
        validate: {
            options: {
                abortEarly: false,
                stripUnknown: true
            }
        }
    }
});

var options = {
    opsInterval: 60000, // 1 minute
    reporters: [
        {
            reporter: require('good-console'),
            events: { ops: '*', error: '*' , log: '*', response: '*' }
        }
    ]
};

require('./api').setup(server);

server.register([require('vision'), require('inert'), { register: require('lout') }], function(err) {
});


server.register({
    register: require('good'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    } else {
        server.start(function () {
            console.info('Server started at ' + server.info.uri);
        });
    }
});
