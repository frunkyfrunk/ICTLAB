const nlp = require('compromise')
const atomicChecker = require('./atomicChecker.js')
// const formChecker;
// const minimalChecker;
// const spellChecker;

//insert user story and return analyzed object with all the details delivered
function analyzeAll(story){
    result = {
        atomic: atomicChecker(story),
        form: formChecker(story),

    }

    return result;
}

console.log(analyzeAll("As a User, I am able to click a particular location from the map and thereby perform a search of landmarks associated with that latitude longitude combination"))
//console.log(analyzeAll("Hello world"))

