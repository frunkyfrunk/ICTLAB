const analyzer = require("./Analyzer/analyzer.js")
const scoring = 0;
const suggestioning = require("./getSuggestions.js");

const USERSTORY = "";

function getStory(story){
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
        //scoreResult = scoring(analyzerResult)
        suggestionsResult = suggestioning(analyzerResult)
    }

    var totalResult = {
        analyzed: analyzerResult,
        score: scoreResult,
        suggestions: suggestionsResult
    }

    return totalResult
};

function main(arg){
    if(Array.isArray(arg)){
        
    } else if(typeof arg === 'string') {
        getStory(arg)
    } else {
        result = "Unknown user story type. please provide an array with strings or a single string."
    }
}
console.log(main("As a User, I am able to click a particular location from the map and thereby perform a search of landmarks associated with that latitude longitude combination"))