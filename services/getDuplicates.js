const nlp = require('compromise');

//function to strip an user story from all verbs and standard format
//so that it won't be comparing useless parts
function stripStory(story) {
    var doc = nlp(story)
    return story
}

function parseStory(story){
    var sentences = story.split(",");
    role = "";
    mean = "";
    end = "";
    if (sentences.length > 2) {
        return {
            role: sentences[0].split(/.*As a\s+|As an\s+(.*).*/i)[2].split(/.*I [a-z]* ([a-z])* ?to+/i),
            mean: sentences[1].replace(/.*I [a-z]* ([a-z])* ?to+/i, ""),
            end: sentences[2].replace(/.*so that|so\s+(.*).*/i, "$1"),
            full: story
        };
    } else {
        return false
    }
}
// console.log(parseStory("As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."))

function checkMinimal(story){
    var minimal = {
        isMinimal:"",
        minimalArray:[]
    }
    var isMinimal;
    var minimalArray = [];
    //var res = story.match(/[.*+?^${}()[\]\\]/g, '\\$&');
    var filter = (/[.*+?^${}()[\]\\]/g, '\\$&')
    // var res = nlp(story).match(filter).out('offset');
    var res = nlp(story).match('mainly').out('text')
    var res2 = nlp(story).has('mainly')
    return res
}
console.log(checkMinimal("The rain in SPAIN stays [mainly] in the plain"));

function checkAtomic(story){
    var atomic = {
        isAtomic: "",
        atomicArray: []
    }
    var isAtomic;
    var atomicArray = [];
    const conjunctions = [' and ', '&', '\+', ' or ', '>', '<', '/', '\\']

    var result = [];
    for(var i = 0; i < conjunctions.length; i++){
        if(nlp(story).match(conjunctions[i]).length != 0)
            result.push(nlp(story).match(conjunctions[i]).out('offset'))
    }
    for(var i = 0; i < result.length; i++){
        for(var x = 0; x < result[i].length; x++){
            var resultObject = {
            word:result[i][x].normal,
            indexStart:result[i][x].wordStart,
            indexEnd:result[i][x].wordEnd
            }
            atomic.atomicArray.push(resultObject);
        }
    }
    if(atomic.atomicArray.length == 0){
        atomic.isAtomic = true
    }else {
        atomic.isAtomic = false
    }
    return atomic;
}

// console.log(checkAtomic("I am winning and I am faster, while being taller and stronger & live to the fullest + win"))
// console.log(checkAtomic("As a User, I am able to click a particular location from the map and thereby perform a search of landmarks associated with that latitude longitude combination"))
// console.log(checkAtomic("Hello world"))

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
//console.log(mainloop(["As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant.","check je dingen","doe je dingen"]))