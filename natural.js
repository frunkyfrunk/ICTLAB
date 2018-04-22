//import library
const natural = require("natural");
const request = require("request");



//function to make a story object, from a story with a format like this:
//<Role>, <Goal>, <Reason>
function getStory(story) {
  var sentences = story.split(",");
  role = "";
  goal = "";
  reason = "";
  if (sentences.length > 2) {
    return {
      role: sentences[0].replace(/.*As a\s+|As an\s+(.*).*/i, "$1"),
      goal: sentences[1].replace(/.*I [a-z]* ([a-z])* ?to+/i, ""),
      reason: sentences[2].replace(/.*so that|so\s+(.*).*/i, "$1"),
      full: story
    };
  } else {
    return false
  }
}

//validate a story with other stories. Will return true valid if the treshold is not exceeded
function validate(story, stories, treshold) {
  for (var i = 0; i < stories.length; i++) {
    var iterated = stories[i];
    if (natural.JaroWinklerDistance(iterated.goal, story.goal) > treshold) {
      return false;
    } else if (
      natural.JaroWinklerDistance(iterated.reason, story.reason) > treshold
    ) {
      return false;
    }
  }
  return true;
}

//validate a story with other stories. Will return true valid if the treshold is not exceeded
function rate(story, stories) {
  var score = 0;
  for (var i = 0; i < stories.length; i++) {
    var iterated = stories[i];
    var subscore = 0;
    subscore += natural.JaroWinklerDistance(iterated.goal, story.goal)
    subscore += natural.JaroWinklerDistance(iterated.reason, story.reason)
    subscore += natural.JaroWinklerDistance(iterated.role, story.role)
    if (score < subscore / 3) {
      score = subscore / 3
    }

  }
  return 10 - (score * 10);
}

function calculateCosineDistance(story1, story2) {
  var sentence1 = story1.replace(/,/g, '').split(' ')
  var sentence2 = story2.replace(/,/g, '').split(' ')
  var words = {}


  for (var i = 0; i < sentence1.length; i++) {
    var word = sentence1[i].toLowerCase()
    if (words[word] == null)
      words[word] = {
        0: 1,
        1: 0
      }
    else
      words[word][0]++;
  }

  for (var i = 0; i < sentence2.length; i++) {
    var word = sentence2[i].toLowerCase()
    if (words[word] == null)
      words[word] = {
        0: 0,
        1: 0
      };
    else
      words[word][1]++;
  }
  var denominator = 0;
  var sqrt1 = 0;
  var sqrt2 = 0;

  for (var key in words) {
    var word = words[key]
    denominator += word[0] * word[1]

    sqrt1 += Math.pow(word[0], 2)
    sqrt2 += Math.pow(word[1], 2)
  }

  var nominator = Math.sqrt(sqrt1) * Math.sqrt(sqrt2)
  return denominator / nominator
}

function AddStoryToMatrix(story) {
  stories[story.full] = story
  for (var neighbour in stories) {
    if (stories[neighbour] != story) {
      var distance = calculateCosineDistance(stories[neighbour].reason + " " +stories[neighbour].goal, story.reason + " " + story.goal)
      stories[neighbour][story.full] = distance
      stories[story.full][neighbour] = distance
    }
  }
}

function getCosineDistance(story1, story2){
  return stories[story1][story2]
}

stories = {}

request(
  "https://api.trello.com/1/boards/BwXA7ZZT/cards/all?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f",
  function (error, response, body) {
    var jsonData = [];
    var hh = JSON.parse(body);
    for (var i in hh) {
      var story = getStory(hh[i].name)
      if (story != false)
        AddStoryToMatrix(story)
    }
    console.log(getCosineDistance("As a Webshop administrator, I want to adjust font-size for the extended description (details on UI), so I have improved readability.","As a user, I want to log in, so that I can save my settings"))
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: jsonData
      })
    };
  }
);