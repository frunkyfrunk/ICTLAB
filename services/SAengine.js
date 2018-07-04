const analyzer = require("./Analyzer/analyzer.js");
const scoring = require("./getScoring.js");
const suggestioning = require("./getSuggestions.js");
const getDuplicates = require("./Analyzer/duplicateChecker.js");

const USERSTORY = "";

function getStory(story) {
  var analyzerResult;
  var scoreResult;
  var suggestionsResult;

  //starting the engine..
  //first check if object is not undefined
  if (story != undefined) {
    //put the user story in the analyzer and get a result.
    analyzerResult = analyzer(story.story);
  }

  //check if result is not undefined
  if (analyzerResult != undefined) {
    scoreResult = scoring(analyzerResult);
    suggestionsResult = suggestioning(analyzerResult, scoreResult);
  }

  var totalResult = {
    id: story.id,
    story: story.story,
    analyzed: analyzerResult,
    score: scoreResult,
    suggestions: suggestionsResult
  };
  return totalResult;
}

function main(arg) {
  let result;
  let stories = [];
  
  for (var i in arg) {
    var story = arg[i];
    stories.push(getStory(story));
  }
  result = {
    stories: stories,
    duplicates: getDuplicates(
      stories.map(function(story) {
        return story.analyzed.form.form.fullstripped;
      }),
      0.8
    )
  };
  return result;
}

module.exports = function(arg) {
  return main(arg);
};
