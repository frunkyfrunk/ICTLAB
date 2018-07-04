//calculate the score of a story
function getScoring(analyzed) {
    return {
        lengthscore: analyzed.nlp.wordcount > 25 || analyzed.nlp.wordcount < 10 ? Math.abs(analyzed.nlp.wordcount - 20) : 0,
        verbscore: analyzed.nlp.verbs > 5 ? analyzed.nlp.verbs : 0,
        nounscore: analyzed.nlp.nouns > 3 ? analyzed.nlp.nouns : 0,
        adjectivescore: analyzed.nlp.adjectives > 3 ? analyzed.nlp.adjectives : 0,
        adverbscore: analyzed.nlp.adverbs > 2 ? analyzed.nlp.adverbs : 0,
        atomicscore: !analyzed.atomic.isAtomic ? 10 : 0,
        formscore: !analyzed.form.isWellFormed ? 10 : 0,
        minimalscore: (analyzed.minimal.length*2)
    }
}
module.exports = function (analyzedstory) {
    return getScoring(analyzedstory)
};