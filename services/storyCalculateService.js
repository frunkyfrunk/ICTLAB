'use strict';
const request = require('request');
const nlp = require('compromise');

class StoryCalculatorService {
  //Get the analytics of the story
  analyzeStory(story) {
    let doc = nlp(story)
    return {
      wordcount: story.split(' ').length,
      verbs: doc.verbs().length,
      nouns: doc.nouns().length,
      adjectives: doc.adjectives().length,
      adverbs: doc.adverbs().length,
      isquestion: (doc.questions().length > 0) ? true : false,
      hasquotes: (doc.quotations().length > 0) ? true : false,
    }
  }

  //Calculate the score of the story
  calculateScore(analyzed, treshold) {
    return {
      lengthscore: analyzed.wordcount - 20 > 5 || analyzed.wordcount < 10 ? 10 - Math.abs(analyzed.wordcount - 20) : 10,
      verbscore: analyzed.verbs > 5 ? 10 - analyzed.verbs : 10,
      nounscore: analyzed.nouns > 3 ? 10 - analyzed.nouns : 10,
      adjectivescore: analyzed.adjectives > 3 ? 10 - analyzed.adjectives : 10,
      adverbscore: analyzed.adverbs > 2 ? 10 - analyzed.adverbs : 10,
    }
  }

  //Get the suggestions for the story
  getSuggestions(analyzed) {
    let suggestions = [];
    if (analyzed.isquestion) {
      suggestions.push({
        message: "Your user story shouldn't contain any questions"
      })

    }
    if (analyzed.hasquotes) {
      suggestions.push({
        message: "Your user story shouldn't contain any quotes"
      })
    }

    if (analyzed.wordcount - 20 > 5) {
      suggestions.push({
        message: "Your user story is too long. Please shorten it"
      })
    } else if (analyzed.wordcount < 10) {
      suggestions.push({
        message: "Your user story is too short. Please make it more descriptive"
      })
    }
    if (analyzed.verbs > 5) {
      suggestions.push({
        message: "Don't use too much verbs in your user story. Try to shorten the story or split it up into multiple stories."
      })
    }
    if (analyzed.adjectives > 3) {
      suggestions.push({
        message: "Don't use too much adjectives in your user story."
      })
    }
    if (analyzed.nouns > 3) {
      suggestions.push({
        message: "We think that your user story contains too many different nouns. Try to make it a more singular story or split it into multiple stories."
      })
    }
    if (analyzed.adverbs > 2) {
      suggestions.push({
        message: "Don't use too many adverbs. It's unnescessary and will make the user story harder to understand for the software engineers"
      })
    }
    return suggestions
  }

  //Get the category tags for the story
  getCategoryTags(story) {
    let doc = nlp(story)
    return doc.match("#Singular").match("!#Pronoun").out('array')
  }

  //Run this to get every result
  main(story, treshold) {
    var analyzed = this.analyzeStory(story)
    return {
      analyzed: analyzed,
      score: this.calculateScore(analyzed, treshold),
      suggestions: this.getSuggestions(analyzed),
      categories: this.getCategoryTags(story)
    }
  }
}

module.exports = new StoryCalculatorService();
console.log(module.exports.main("Don't use too many adverbs? It's unnescessary and will make the user story harder to understand for the software engineers"))