const analyzing = require("./Analyzer/analyzer.js")
const scoring = 0;
const suggestioning = 0;

const USERSTORY = "";

function main(story){
    var analyzerResult;
    var scoreResult;
    var suggestionsResult;

    //starting the engine..
    //first check if object is not undefined
    if(story != undefined){
        //put the user story in the analyzer and get a result.
        analyzerResult = analyzer(story)
    }

    //check if result is not undefined
    if(analyzerResult != undefined){
        scoreResult = scoring(analyzerResult)
        suggestionsResult = suggestioning(analyzerResult)
    }

    var totalResult = {
        score: scoreResult,
        suggestions: suggestionResult
    }
};