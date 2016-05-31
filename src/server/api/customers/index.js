var Joi = require('joi')
    , controller = require('./controller')
    , schema = require('./schema')


module.exports = [
    {
        method: 'GET', path: '/customers',
        handler: controller.find,
        config: {
            auth: false
        }
    },
    {
        method: 'GET', path: '/customers/{id}',
        handler: controller.get,
        config: {
            auth: false
        }
    },
    {
        method: 'POST', path: '/customers',
        handler: controller.post,
        config:{
            auth: false,
            validate:{
                payload: schema
            }
        }
    },
    {
        method: 'PUT', path: '/customers/{id}',
        handler: controller.put,
        config:{
            auth: false,
            validate:{
                payload: schema
            }
        }
    }
]
