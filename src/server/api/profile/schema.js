var Joi = require('joi')

var schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date().optional().allow(null),
    // TODO: uncomment this when we can verify email addresses
    // email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(null)
});

module.exports = schema;