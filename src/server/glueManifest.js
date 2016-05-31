const config = require('./config')

module.exports = {
    connections: [
        {
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
        }
    ],
    registrations: [
        {
            plugin: {
                register: 'good',
                options: {
                    ops: {
                        interval: 60000  // 1 minute
                    },
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ops: '*', error: '*', log: '*', response: '*'}]
                            },
                            {
                                module: 'good-console'
                            },
                            'stdout'
                        ]
                    }
                }
            }
        },
        {
            plugin: 'vision'
        },
        {
            plugin: 'inert'
        },
        {
            plugin: 'lout'
        },
        {
            plugin: './static',
        },
        {
            plugin: './authentication',
            options: {
                routes: {
                    prefix: '/auth'
                }
            }
        },
        /*
        {
            plugin: './authorization'
        },
        */
        {
            plugin: './api',
            options: {
                routes: {
                    prefix: '/api'
                }
            }
        }
    ]
}