'use strict';
const model = require('../models/usermodel.js')
const response = require('../services/response.js')

module.exports.getUserStory = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  model.findAll().then(user => {
    callback(null, response.createResponse(200, user))
  })
};
