const pluginName = 'acl';

var internals = {};

exports.register = function (server, options, next) {

    //server.ext('onPreStart', internals.validateRoutes);
    server.ext('onPreHandler', internals.onPreHandler);

    next();
}

exports.register.attributes = {
    name: 'acl',
    version: '0.0.0'
    //pkg: require('../package.json')
};

internals.getUserRoles = (request) => {
    return request.auth.credentials.roles
}

internals.onPreHandler = (request, reply) => {

    if(request.route.method === 'options')
        return reply.continue();

    let settings = request.route.settings.plugins['acl'];

    if (!settings || settings.validate === false)
        reply.continue();

    // settings.resource
    // let userRoles = this.getUserRoles(request);

    reply.continue();
}