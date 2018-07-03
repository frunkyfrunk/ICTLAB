const nlp = require('compromise')
const atomicChecker = require('./atomicChecker.js')
const formChecker = require('./formChecker.js');
const minimalChecker = require('./minimalChecker.js');
const spellChecker = require('./spellChecker.js');

//insert user story and return analyzed object with all the details delivered
function analyzeAll(story){
    result = {
        atomic: atomicChecker(story),
        form: formChecker(story),
        spellcheck:spellChecker(story),
        minimal:minimalChecker(story)
    }

    return result;
}
module.exports = function (story) {
    return analyzeAll(story)
};
//console.log(analyzeAll("As a User, I am able to click a particular location from the map and thereby perform a search of landmarks associated with that latitude longitude combination"))
console.log(analyzeAll("As a Manny’s food service customer, I need to save, copy, print, and email my list so that I can edit it again, check a received shipment against a printed list, and send the list to a restaurant."))

