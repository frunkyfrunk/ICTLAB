const analyzer = require("./Analyzer/analyzer.js")
const scoring = require("./getScoring.js")
const suggestioning = require("./getSuggestions.js")
const getDuplicates = require("./Analyzer/duplicateChecker.js")

const USERSTORY = "";

function getStory(story) {
    var analyzerResult;
    var scoreResult;
    var suggestionsResult;

    //starting the engine..
    //first check if object is not undefined
    if (story != undefined) {
        //put the user story in the analyzer and get a result.
        analyzerResult = analyzer(story)
    }

    //check if result is not undefined
    if (analyzerResult != undefined) {
        scoreResult = scoring(analyzerResult)
        suggestionsResult = suggestioning(analyzerResult)
    }

    var totalResult = {
        story:story,
        analyzed: analyzerResult,
        score: scoreResult,
        suggestions: suggestionsResult
    }
    return totalResult
};

function main(arg) {
    let result;
    if (Array.isArray(arg)) {
        console.log('isarray');
        let stories = []
        for (var i in arg) {
            var story = arg[i]
            stories.push(getStory(story))
        }
        result = {
            stories: stories,
            duplicates: getDuplicates(stories.map(function(story){
                return story.analyzed.form.form.fullstripped
            }),0.8)
        }
    } else if (typeof arg === 'string') {
        getStory(arg)
    } else {
        result = "Unknown user story type. please provide an array with strings or a single string."
    }
    return result;
}

module.exports = function (arg) {
    return main(arg)
};
