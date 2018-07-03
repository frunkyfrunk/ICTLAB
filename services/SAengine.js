const analyzer = require("./Analyzer/analyzer.js")
const scoring = 0
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

function main(arg) {
    let result;
    if (Array.isArray(arg)) {
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
console.log(main([
    "As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant.",
    "As a business user, I would like a report of item profitability so that I can identify and highlight profitable items and consider what to do about underperforming items.",
    "As a customer ordering food, I want to locate previous food order lists so that I can see all the lists that I have.",
    "As a tester, I want to have detailed test plans so that when the system is completed, I can test the system.",
     "As a tester, I want to have detailed test plans so that when the system is completed, I can test the syste.",
]))