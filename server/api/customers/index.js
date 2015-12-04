var Joi = require('joi')
    , controller = require('./controller')
    , schema = require('./schema')


module.exports = [
    { method: 'GET', path: '/api/customers', handler: controller.find },
    { method: 'GET', path: '/api/customers/{id}', handler: controller.get },
    { method: 'POST', path: '/api/customers', handler: controller.post,
        config:{
            validate:{
                payload: schema
            }
        }
    },
    { method: 'PUT', path: '/api/customers/{id}', handler: controller.put,
        config:{
            validate:{
                payload: schema
            }
        }
    }
]
