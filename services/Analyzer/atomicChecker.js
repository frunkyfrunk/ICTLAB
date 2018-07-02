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