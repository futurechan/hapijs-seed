var Joi = require('joi');

var schema = Joi.object().keys({
    id: Joi.number().integer().positive(),
    name: Joi.string().required(),
    phone: Joi.string()
});

module.exports = schema;
