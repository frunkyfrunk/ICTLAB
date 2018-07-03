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
