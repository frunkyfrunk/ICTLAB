'use strict';
const SAengine = require("./services/SAengine.js")

module.exports.getScore = (event, context, callback) => {

  console.log('GETSCORE METHOD');

  const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
        body: SAengine(["test"]),
      }),        
    };
    callback(null,response);
};



// function saveStories(stories){

//   console.log('START LOGGIN DB CONNECTIONS!');
//   //  console.log(stories);

// var ObjStories = JSON.parse(stories);

//   for(var index in ObjStories) {
//     var data = [];
//     var storyName = ObjStories[index];
//     // var score = stories[index].score;
//     data.push(ObjStories);

//     console.log('DEBUG STORY NAME');
//     console.log(storyName);
//     data.push(100);
//     // var json_story = JSON.parse(data);
//     request.post({
//       url: 'https://unxe4qrdkk.execute-api.us-east-1.amazonaws.com/dev/stories',
//       body: storyName,
//       json: true
//     }, function(error, response, body){
//       console.log(body);
//     });
//   }
// }

// function calculateAverageScore(stories) {

//   var totalscore = 0;
//   var total = 0;

//   for (var i in stories) {

//     total++;

//     totalscore += stories[i].score;
//   }

//   return totalscore / total;
// }

// module.exports.getScore = (event, context, callback) => {
  
//   // const data = calculateScore(event.body);
//   var dummyData  = '[{"story":"Ford"}, {"story":"BMW"}]';
//   var jsonData = JSON.parse(event.body);
//   var data = [];

//   // console.log('LOG STRING: ' + event.body);
//   // console.log('start loggin BODY propety');
//   // console.log(event.body);
  

//   for (var i in jsonData) {
    
//     // console.log('Start logging words to calc method');
//     // console.log(jsonData[i].story);
//     data.push(StoryCalculatorService.calculateScore(jsonData[i].story));
//     // console.log(data);
//   }

//   // saveStories(dummyData);

//   var averagescore = {
//     'averagescore': calculateAverageScore(data),
//   };

//   var aaaaa = JSON.stringify({'averagescore': calculateAverageScore(data)});

//   // data.push(averagescore);

//   const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       },
//       body: JSON.stringify({
//         data,
//         averagescore: calculateAverageScore(data),
//       }),        
//     };
//     callback(null,response);
// };

// module.exports.getStoryCategories = (event, context, callback) => {
  
//   var dummyData  = '[{"story":"As user I want"}, {"story":"As Admininistrator i want dashboard"}]';
//   var jsonData = JSON.parse(event.body);
//   var data = [];

//     for (var i in jsonData) {
    
//       data.push(StoryCalculatorService.storyCategories(jsonData[i].story));
//       console.log(jsonData[i].story);
//   }

//   // const data = storyCategories(event.body);

//   const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       },
//       body: JSON.stringify({
//        data
//       }),
//     };
//     callback(null,response);
// };


// module.exports.saveStories = (event, context, callback) => {
  
//   var dummyData  = '[{"story":"As user I want"}, {"story":"As Admininistrator i want dashboard"}]';
//   var jsonData = JSON.parse(event.body);

//   console.log(jsonData)
  
//   saveStories(event.body);

//   const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       },
//       body: JSON.stringify({
//        'status' : 'ok'
//       }),
//     };
//     callback(null,response);
// };

// module.exports.getAllcardsAverage = (event, context, callback) => {
  
//   request.get('https://api.trello.com/1/members/me/cards?filter=all&key=32e0f2d3d2fc039ebace2c6d393b474d&token=0f4c965e894ab5c745329eb60fbe9bab9c132505efc64a7b51029cb483b75066', function (error, response, body) {
     
//     var myData = JSON.parse(body);
//     var totalScore = 0;
//     var totalCards = 0;

//     for (var i in myData) {

//       totalCards++;
      
//       var cardScore = StoryCalculatorService.calculateScore(myData[i].name).score;

//       totalScore += cardScore;
//     }

//     var data = Math.round(totalScore / totalCards);

//     response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Credentials': true,
//       },
//       body: JSON.stringify({
//        data
//       }),
//     };
//     callback(null,response);
//   });    
// };