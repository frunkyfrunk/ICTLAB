const nlp = require('compromise')
const atomicChecker = require('./atomicChecker.js')
const formChecker = require('./formChecker.js');
const minimalChecker = require('./minimalChecker.js');
const spellChecker = require('./spellChecker.js');
const nlpChecker = require('./nlpChecker.js');

//insert user story and return analyzed object with all the details delivered
function analyzeAll(story){
    result = {
        atomic: atomicChecker(story),
        form: formChecker(story),
        //spellcheck:spellChecker(story),
        minimal:minimalChecker(story),
        nlp:nlpChecker(story)
    }

    return result;
}
module.exports = function (story) {
    return analyzeAll(story)
};