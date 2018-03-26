'use strict'
const response = require('../services/response.js')
const jwt = require('jsonwebtoken')



module.exports.getToken = (event, context, callback) => {
    const user = {id: 3}
    const token = jwt.sign({user}, 'secret_key')
    // callback(null, response.createResponse(200, token))
}
