'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config')
const moment = require('moment');


exports.register = (server, options, next) => {

    // mount auth routes

    server.register(require('hapi-auth-bearer-token'), (err) => {

        server.auth.strategy('simple', 'bearer-access-token', {
            allowQueryToken: true,              // optional, true by default
            allowMultipleHeaders: false,        // optional, false by default
            validateFunc: ( token, callback ) => {

                jwt.verify(token, config.TOKEN_SECRET, (err, payload) => {

                    if (err) return callback(err, false);

                    if (payload.exp <= moment().unix())
                        return callback(null, false)

                    callback(null, true, payload.user);
                });
            }
        });
    });

    server.auth.default('simple');

    next();
};

exports.register.attributes = {
    name: 'authentication',
    version: '0.0.0'
};