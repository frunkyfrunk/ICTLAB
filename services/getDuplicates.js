const nlp = require("compromise");

//function to strip an user story from all verbs and standard format
//so that it won't be comparing useless parts
function stripStory(story) {
  var doc = nlp(story);
  return story;
}

function parseStory(story) {
  return {
    role: story.split(/.*As a\s+|As an\s+(.*).*,\s+/i)[2].split(",")[0],
    mean: story.split(/.*I (would like|need|want|have)* ?\s+(.*).*so that|so\s+/i)[2].replace('to',''),
    end: story.split(/.*so that|so\s+(.*).*/i)[2],
    full: story
  };
}
// console.log(parseStory("As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."))

function calculateCosineDistance(story1, story2) {
  var sentence1 = story1.replace(/,/g, "").split(" ");
  var sentence2 = story2.replace(/,/g, "").split(" ");
  var words = {};
  for (var i = 0; i < sentence1.length; i++) {
    var word = sentence1[i].toLowerCase();
    if (words[word] == null)
      words[word] = {
        0: 1,
        1: 0
      };
    else words[word][0]++;
  }

  for (var i = 0; i < sentence2.length; i++) {
    var word = sentence2[i].toLowerCase();
    if (words[word] == null)
      words[word] = {
        0: 0,
        1: 0
      };
    else words[word][1]++;
  }
  var denominator = 0;
  var sqrt1 = 0;
  var sqrt2 = 0;

  for (var key in words) {
    var word = words[key];
    denominator += word[0] * word[1];

    sqrt1 += Math.pow(word[0], 2);
    sqrt2 += Math.pow(word[1], 2);
  }

  var nominator = Math.sqrt(sqrt1) * Math.sqrt(sqrt2);
  return denominator / nominator;
}

function AddStoryToMatrix(story, stories) {
  stories[story] = {};
  for (var neighbour in stories) {
    if (stories[neighbour] != story) {
      var distance = calculateCosineDistance(neighbour, story);
      stories[neighbour][story] = distance;
      stories[story][neighbour] = distance;
    }
  }
}

function getCosineDistance(story1, story2) {
  return stories[story1][story2];
}

function mainloop(stories) {
  let matrix = {};
  for (var i in stories) {
    console.log(stories[i])
    var story = parseStory(stories[i]);
    if (story != false)
      AddStoryToMatrix(story.role + story.mean + story.end, matrix);
  }
  return matrix;
}

console.log(mainloop([
    "As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant.",
    "As a business user, I would like a report of item profitability so that I can identify and highlight profitable items and consider what to do about underperforming items.",
    "As a customer ordering food, I want to locate previous food order lists so that I can see all the lists that I have.",
    "As a tester, I want to have detailed test plans so that when the system is completed, I can test the system.",
  ]))
