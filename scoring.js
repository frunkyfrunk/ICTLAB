var nlp = require('compromise')

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


function getScore(story) {
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

console.log(getScore("As a developer, I preferly want to finalize the database table changes and additions for the release so that we don’t have to make changes to the model later."))
console.log(getScore("As a Manny’s food service customer, I want to see different food item types displayed in different colors—RGB = #FF0000 for meats, #A52AFA for grains, and #808000 for vegetables and fruits—so that I can quickly identify my food items by food type."))
console.log(getScore("As a business user, I would like a report of item profitability so that I can identify and highlight profitable items and consider what to do about underperforming items."))

console.log(getScore("As a developer, I want to finalize the database table changes so that we don’t have to make changes to the model later."))
console.log(getScore("As a developer, I want to finalize the database table additions so that we don’t have to make changes to the model later."))