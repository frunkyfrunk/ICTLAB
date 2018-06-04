'use strict';
const request = require('request');
const nlp = require('compromise')


function calculateScore(story) {
  let suggestions = []
  let doc = nlp(story)
  let wordcount = story.split(' ').length;
  let lengthscore = 10;

  let verbs = doc.verbs().length;
  let nouns = doc.nouns().length;
  let adjectives = doc.adjectives().length;
  let adverbs = doc.adverbs().length;
  let isquestion = (doc.questions().length > 0) ? true : false;
  let hasquotes = (doc.quotations().length > 0) ? true : false;
  
  if (isquestion) {
    suggestions.push({
      penaltypoints: 0,
      message: "Your user story shouldn't contain any questions"
    })

  }

  if (hasquotes) {
    suggestions.push({
      penaltypoints: 0,
      message: "Your user story shouldn't contain any quotes"
    })
  }

  if (wordcount - 20 > 5) {
    lengthscore -= Math.abs(wordcount - 20);
    suggestions.push({
      penaltypoints: Math.abs(wordcount - 20) *2,
      message: "Your user story is too long. Please shorten it"
    })
  } else if (wordcount < 10) {
    lengthscore -= Math.abs(wordcount - 20);
    suggestions.push({
      penaltypoints: Math.abs(wordcount - 20) *2,
      message: "Your user story is too short. Please make it more descriptive"
    })
  }


  let verbscore = 10;
  let nounscore = 10;
  let adjectivescore = 10;
  let adverbscore = 10;

  if (verbs > 5) {
    verbscore -= verbs
    suggestions.push({
      penaltypoints: verbs *2,
      message: "Don't use too much verbs in your user story. Try to shorten the story or split it up into multiple stories."
    })
  }
  if (adjectives > 3) {
    adjectivescore -= adjectives;
    suggestions.push({
      penaltypoints: adjectives *2,
      message: "Don't use too much adjectives in your user story."
    })
  }
  if (nouns > 3) {
    nounscore -= nouns;
    suggestions.push({
      penaltypoints: nouns *2,
      message: "We think that your user story contains too many different nouns. Try to make it a more singular story or split it into multiple stories."
    })
  }
  if (adverbs > 2) {
    adverbscore -= adverbs;
    suggestions.push({
      penaltypoints: adverbs *2,
      message: "Don't use too many adverbs. It's unnescessary and will make the user story harder to understand for the software engineers"
    })
  }
  return {
    score: (2 * lengthscore) + (2 * verbscore) + (2 * nounscore) + (2 * adjectivescore) + (2 * adverbscore),
    suggestions: suggestions
  };
}

function storyCategories(story){
  let doc = nlp(story)
  return doc.match("#Singular").match("!#Pronoun").out('array')
 }




function saveStories(stories){

  console.log('START LOGGIN DB CONNECTIONS!');
  //  console.log(stories);

var ObjStories = JSON.parse(stories);

  for(var index in ObjStories) {
    var data = [];
    var storyName = ObjStories[index];
    // var score = stories[index].score;
    data.push(ObjStories);

    console.log('DEBUG STORY NAME');
    console.log(storyName);
    data.push(100);
    // var json_story = JSON.parse(data);
    request.post({
      url: 'https://unxe4qrdkk.execute-api.us-east-1.amazonaws.com/dev/stories',
      body: storyName,
      json: true
    }, function(error, response, body){
      console.log(body);
    });
  }

}








module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
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
    data.push(calculateScore(jsonData[i].story));
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
    
      data.push(storyCategories(jsonData[i].story));
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
  
  saveStories(event.body);

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









module.exports.getAllStories = (event, context, callback) => {
  //key = a9ce77430032f94b49e35446c5587c85
  //token = 2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  //usernameOrID = bennymohan
  //https://api.trello.com/1/members/bennymohan/boards?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  request.get('https://api.trello.com/1/boards/BwXA7ZZT/cards/all?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f', function (error, response, body) {
    var data = [];
    var hh = JSON.parse(body);
    for (var i in hh) {
      data.push('{"name" : '+ '"'+ hh[i].name+'"' + ', "id" : '+ '"'+ hh[i].id+'"}' );
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
       data
      }),
    };
    console.log(body);
    callback(null,response);
  });
};

module.exports.getAllProjects = (event, context, callback) => {
  //key = a9ce77430032f94b49e35446c5587c85
  //token = 2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  //usernameOrID = bennymohan
  //https://api.trello.com/1/members/bennymohan/boards?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  request.get('https://api.trello.com/1/members/bennymohan/boards?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f', function (error, response, body) {
    var data = [];
    var hh = JSON.parse(body);
    for (var i in hh) {
      var project = {};
      project.name =  hh[i].name;
      project.id = hh[i].id;
      data.push(project);
    }

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
    console.log(body);
    callback(null,response);
  });
};


module.exports.getAllBoardsByProject = (event, context, callback) => {
  //key = a9ce77430032f94b49e35446c5587c85
  //token = 2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  //usernameOrID = bennymohan
  //https://api.trello.com/1/members/bennymohan/boards?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f
  request.get('https://api.trello.com/1/boards/5a85c18231ab0928c5d0c3ea/lists?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f&cards=open&card_fields=name&filter=open&fields=name', function (error, response, body) {
    var data = [];
    var cards = [];
    var hh = JSON.parse(body);
    for (var i in hh) {
      cards = [];
      var project = {};
      project.name =  hh[i].name;
      project.id = hh[i].id;
      
      for (var a in hh[i].cards){
        var userStories = {}
        userStories.name = hh[i].cards[a].name;
        userStories.id =  hh[i].cards[a].id;
        cards.push(userStories);
      }
      project.cards = cards;
      data.push(project);
    }

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
    console.log(body);
    callback(null,response);
  });
};

module.exports.getAllcardsAverage = (event, context, callback) => {
  
  request.get('https://api.trello.com/1/members/me/cards?filter=all&key=32e0f2d3d2fc039ebace2c6d393b474d&token=0f4c965e894ab5c745329eb60fbe9bab9c132505efc64a7b51029cb483b75066', function (error, response, body) {
     
    var myData = JSON.parse(body);
    var totalScore = 0;
    var totalCards = 0;

    for (var i in myData) {

      totalCards++;
      
      var cardScore = calculateScore(myData[i].name).score;

      totalScore += cardScore;
    }

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