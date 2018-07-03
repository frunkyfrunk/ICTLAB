//Get the suggestions for the story
function getSuggestions(analyzed) {
    let suggestions = [];
    if (analyzed.isquestion) {
        suggestions.push({
            message: "Your user story shouldn't contain any questions"
        })

    }
    if (analyzed.hasquotes) {
        suggestions.push({
            message: "Your user story shouldn't contain any quotes"
        })
    }

    if (analyzed.wordcount - 20 > 5) {
        suggestions.push({
            message: "Your user story is too long. Please shorten it"
        })
    } else if (analyzed.wordcount < 10) {
        suggestions.push({
            message: "Your user story is too short. Please make it more descriptive"
        })
    }
    if (analyzed.verbs > 5) {
        suggestions.push({
            message: "Don't use too much verbs in your user story. Try to shorten the story or split it up into multiple stories."
        })
    }
    if (analyzed.adjectives > 3) {
        suggestions.push({
            message: "Don't use too much adjectives in your user story."
        })
    }
    if (analyzed.nouns > 3) {
        suggestions.push({
            message: "We think that your user story contains too many different nouns. Try to make it a more singular story or split it into multiple stories."
        })
    }
    if (analyzed.adverbs > 2) {
        suggestions.push({
            message: "Don't use too many adverbs. It's unnescessary and will make the user story harder to understand for the software engineers"
        })
    }
    return suggestions
}
module.exports = function (analyzedstory) {
    return getSuggestions(analyzedstory)
};