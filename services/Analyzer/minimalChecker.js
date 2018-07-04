const nlp = require('compromise')

function checkMinimal(story) {
    var minimal = {
        isMinimal: "",
        minimalArray: []
    }
    var isMinimal;
    var minimalArray = [];
    var forbiddenchars = ['?', '^', '$', '{', '}', '(', ')', '[', ']', '/', '\/']
    var indices = [];
    for (var i = 0; i < story.length; i++) {
        for (var j = 0; j < forbiddenchars.length; j++) {
            if (story[i] === forbiddenchars[j]) indices.push({
                index: i,
                char: forbiddenchars[j]
            });
        }
    }
    var res = nlp(story).match('mainly').out('text')
    var res2 = nlp(story).has('mainly')
    return indices
}

module.exports = function (story) {
    return checkMinimal(story)
};