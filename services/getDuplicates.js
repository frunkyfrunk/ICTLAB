const nlp = require('compromise');

//function to strip an user story from all verbs and standard format
//so that it won't be comparing useless parts
function stripStory(story) {
    var doc = nlp(story)
    return story
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

function calculateCosineDistance(story1, story2) {
    var sentence1 = story1.replace(/,/g, '').split(' ')
    var sentence2 = story2.replace(/,/g, '').split(' ')
    var words = {}
    for (var i = 0; i < sentence1.length; i++) {
        var word = sentence1[i].toLowerCase()
        if (words[word] == null)
            words[word] = {
                0: 1,
                1: 0
            }
        else
            words[word][0]++;
    }

    for (var i = 0; i < sentence2.length; i++) {
        var word = sentence2[i].toLowerCase()
        if (words[word] == null)
            words[word] = {
                0: 0,
                1: 0
            };
        else
            words[word][1]++;
    }
    var denominator = 0;
    var sqrt1 = 0;
    var sqrt2 = 0;

    for (var key in words) {
        var word = words[key]
        denominator += word[0] * word[1]

        sqrt1 += Math.pow(word[0], 2)
        sqrt2 += Math.pow(word[1], 2)
    }

    var nominator = Math.sqrt(sqrt1) * Math.sqrt(sqrt2)
    return denominator / nominator
}

function AddStoryToMatrix(story, stories) {
    stories[story] = {}
    for (var neighbour in stories) {
        if (stories[neighbour] != story) {

            var distance = calculateCosineDistance(neighbour, story)
            stories[neighbour][story] = distance
            stories[story][neighbour] = distance
        }
    }
}

function getCosineDistance(story1, story2) {
    return stories[story1][story2]
}

function mainloop(stories) {
    let matrix = {}
    for (var i in stories) {
        var story = stripStory(stories[i])
        if (story != false)
            AddStoryToMatrix(story, matrix)
    }
    return matrix;
}
console.log(mainloop(["test je dingen","check je dingen","doe je dingen"]))