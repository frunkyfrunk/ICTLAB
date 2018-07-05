const nlp = require('compromise')
function analyzeWords(story) {
  let doc = nlp(story);
  return {
    wordcount: story.split(" ").length,
    verbs: doc.verbs().length,
    nouns: doc.nouns().length,
    adjectives: doc.adjectives().length,
    adverbs: doc.adverbs().length,
    tags: doc
      .match("#Singular")
      .match("!#Pronoun")
      .out("array")
  };
}

module.exports = function(story) {
  return analyzeWords(story);
};
