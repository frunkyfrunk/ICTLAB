//Get the suggestions for the story
function getSuggestions(analyzed) {
    let suggestions = [];
    if (analyzed.nlp.isquestion) {
        suggestions.push({
            id:0,
            message: "Your user story shouldn't contain any questions"
        })
    }
    if (analyzed.nlp.hasquotes) {
        suggestions.push({
            id:1,
            message: "Your user story shouldn't contain any quotes"
        })
    }

    if (analyzed.nlp.wordcount - 20 > 5) {
        suggestions.push({
            id:2,
            message: "Your user story is too long. Please shorten it"
        })
    } else if (analyzed.nlp.wordcount < 10) {
        suggestions.push({
            id:3,
            message: "Your user story is too short. Please make it more descriptive"
        })
    }
    if (analyzed.nlp.verbs > 5) {
        suggestions.push({
            id:4,
            message: "Don't use too many verbs in your user story. Try to shorten the story or split it up into multiple stories."
        })
    }
    if (analyzed.nlp.adjectives > 3) {
        suggestions.push({
            id:5,
            message: "Don't use too many adjectives in your user story."
        })
    }
    if (analyzed.nlp.nouns > 3) {
        suggestions.push({
            id:6,
            message: "We think that your user story contains too many different nouns. Try to make it a more singular story or split it into multiple stories."
        })
    }
    if (analyzed.nlp.adverbs > 2) {
        suggestions.push({
            id:7,
            message: "Don't use too many adverbs. It's unnescessary and will make the user story harder to understand for the software engineers"
        })
    }
    if (!analyzed.atomic.isAtomic) {
        suggestions.push({
            id:8,
            message: "Your user story is not atomic",
            positions:analyzed.atomic.atomicArray
        })
    }
    if (!analyzed.form.isWellFormed) {
        let message = "Your user story is not well formed. The analyzer couldn't find the following parts:"
        if (analyzed.form.form.role == false)
            message += " role"
        if (analyzed.form.form.mean == false)
            message += " mean"
        if (analyzed.form.form.end == false)
            message += " end"
        suggestions.push({
            id:9,
            message: message
        })
    }
    if (analyzed.minimal.length > 0) {
        let message = "You have some characters in your user story that violate the minimal principle of a good user story:"
        for (var i in analyzed.minimal) {
            var char = analyzed.minimal[i]
            message += " " + char.char
        }
        suggestions.push({
            id:10,
            message: message,
            positions: analyzed.minimal
        })
    }

    return suggestions
}
module.exports = function (analyzedstory) {
    return getSuggestions(analyzedstory)
};