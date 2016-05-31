const controller = require('./controller')
const schema = require('./schema')
module.exports = [
    { method: 'GET', path: '/profile',
        handler: controller.get,
        config: {
            plugins: {
                acl: {
                    resource: 'profile',
                    validate: false
                }
            }
        }
    },
    { method: 'PUT', path: '/profile',
        handler: controller.put,
        config: {
            validate: {
                payload: schema
            },
            plugins: {
                acl: {
                    resource: 'profile',
                    validate: false
                }
            }
        }
    }
];