const nlp = require("compromise");

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

module.exports = function (story) {
    return checkAtomic(story)
};