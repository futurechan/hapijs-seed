const path = require('path')
const clientDir = path.join(__dirname, '../../client')

exports.register = (server, options, next) => {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: clientDir
            }
        },
        config:{
            auth: false
        }
    });

    server.ext('onPostHandler', (request, reply) => {

        var response = request.response;

        if (response.isBoom
            && request.headers["accept"]
            && request.headers["accept"].indexOf("text/html") == 0
            && !/^xmlhttprequest/i.test(request.headers["x-requested-with"])){
            return reply.file(path.join(clientDir, 'index.html'));
        }

        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'static',
    version: '0.0.0'
};