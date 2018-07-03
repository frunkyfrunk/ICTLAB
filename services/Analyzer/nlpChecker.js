function analyzeWords(story) {
    let doc = nlp(story)
    return {
        wordcount: story.split(' ').length,
        verbs: doc.verbs().length,
        nouns: doc.nouns().length,
        adjectives: doc.adjectives().length,
        adverbs: doc.adverbs().length,
    }
}

module.exports = function (story) {
    return analyzeWords(story)
};