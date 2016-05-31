const db = require('../../db').sequelize
const User = db.model('User')
const _ = require('lodash')

module.exports.get = (request, reply) => {

    User.findById(request.auth.credentials.id)
        .then(user => {
            reply(user.get({plain:true}))
        })
}

module.exports.put = (request, reply) => {

    User.findById(request.auth.credentials.id)
        .then(user => {
            _.assign(user, request.payload);
            
            return user.save();
        })
        .then(() => {
            reply();
        })
        .catch((error) => {
            reply().statusCode(500);
        })
}