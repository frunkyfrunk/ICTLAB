'use strict';
const request = require('request');
const nlp = require('compromise')
const StoryCalculatorService = require('./services/storyCalculateService.js');
const StoryService = require('./services/storyService.js');

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};


function calculateAverageScore(stories) {

  var totalscore = 0;
  var total = 0;

  for (var i in stories) {

    total++;

    totalscore += stories[i].score;
  }

  return totalscore / total;
}

module.exports.getScore = (event, context, callback) => {
  
  // const data = calculateScore(event.body);
  var dummyData  = '[{"story":"Ford"}, {"story":"BMW"}]';
  var jsonData = JSON.parse(event.body);
  var data = [];

  // console.log('LOG STRING: ' + event.body);
  // console.log('start loggin BODY propety');
  // console.log(event.body);
  

  for (var i in jsonData) {
    
    // console.log('Start logging words to calc method');
    // console.log(jsonData[i].story);
    data.push(StoryCalculatorService.calculateScore(jsonData[i].story));
    // console.log(data);
  }

  // saveStories(dummyData);

  var averagescore = {
    'averagescore': calculateAverageScore(data),
  };

  var aaaaa = JSON.stringify({'averagescore': calculateAverageScore(data)});

  // data.push(averagescore);

  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        data,
        averagescore: calculateAverageScore(data),
      }),        
    };
    callback(null,response);
};

module.exports.getStoryCategories = (event, context, callback) => {
  
  var dummyData  = '[{"story":"As user I want"}, {"story":"As Admininistrator i want dashboard"}]';
  var jsonData = JSON.parse(event.body);
  var data = [];

    for (var i in jsonData) {
    
      data.push(StoryCalculatorService.storyCategories(jsonData[i].story));
      console.log(jsonData[i].story);
  }

  // const data = storyCategories(event.body);

  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
       data
      }),
    };
    callback(null,response);
};


module.exports.saveStories = (event, context, callback) => {
  
  var dummyData  = '[{"story":"As user I want"}, {"story":"As Admininistrator i want dashboard"}]';
  var jsonData = JSON.parse(event.body);

  console.log(jsonData)
  
  StoryService.saveStories(event.body);

  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
       'status' : 'ok'
      }),
    };
    callback(null,response);
};


module.exports.getStories = (event, context, callback) => {
  // fetch all stories from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the stories.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};


module.exports.getAllcardsAverage = (event, context, callback) => {
  
  var dbStories;

  dynamoDb.scan(params, (error, result) => {

  dbStories = result.Items;

  console.log('DBSTORIES DEBUG');
  console.log(dbStories);

  // StoryCalculatorService.calculateScore(myData[i].story);
  //   // create a response
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(result.Items),
  //   };
  //   callback(null, response);
  });

  

// need to return data, need to give data correctly to forloop

  request.get('https://api.trello.com/1/members/me/cards?filter=all&key=32e0f2d3d2fc039ebace2c6d393b474d&token=0f4c965e894ab5c745329eb60fbe9bab9c132505efc64a7b51029cb483b75066', function (error, response, body) {
     
    // var myData = JSON.parse(dbStories)
    var myData = dbStories;
    var totalScore = 0;
    var totalCards = 0;

    for (var i in myData) {

      totalCards++;
      
      var cardScore = myData[i].score;

      console.log('mydata[i] object');
      console.log(cardScore);

      totalScore += cardScore;
    }

    console.log('TOTAL SCORE');
    console.log(totalScore);
    var data = Math.round(totalScore / totalCards);

    response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
       data
      }),
    };
    callback(null,response);
  });    
};