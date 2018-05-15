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


function getScore(story){
  let doc = nlp(story)
  let wordcount = story.split(' ').length;
  let lengthscore = 0;
  if(Math.abs(wordcount - 20) > 5){
    lengthscore = Math.abs(wordcount - 20);
  }
  let verbs = doc.verbs().length;
  let nouns = doc.nouns().length;
  let adjectives = doc.adjectives().length;

  let verbscore = 0;
  let nounscore = 0;
  let adjectivescore = 0;
  console.log(verbs)
  console.log(nouns)
  console.log(adjectives)
  if(verbs > 5){
    verbscore = verbs*5
  }
  if(adjectives > 1){
    adjectivescore = adjectives*10;
  } 
  if(nouns > 4){
    nounscore = nouns*5;
  }

  return 100 - lengthscore - verbscore - nounscore - adjectivescore;
}

console.log(getScore("As an administrator, I would like to have a control panel, so that I can manage all the users"))
console.log(getScore("As an administrator, I would be happy to have a panel, so that I can manage all the users"))
