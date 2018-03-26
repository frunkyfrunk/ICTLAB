'use strict';
const model = require('../models/usermodel.js')
const response = require('../services/response.js')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports.registerUser = (event, context, callback) => {
    console.log(event.name)
    // model.findOrCreate({where:{name:event.key1}}).spread((object, created) => {
    //     console.log(object)
    //     console.log(created)
    // })
    //callback(null, response.createResponse(200,body))
}