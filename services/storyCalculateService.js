'use strict';
const request = require('request');
const nlp = require('compromise');

class StoryCalculatorService {
    calculateScore(story) {
        let suggestions = []
        let doc = nlp(story)
        let wordcount = story.split(' ').length;
        let lengthscore = 10;
      
        let verbs = doc.verbs().length;
        let nouns = doc.nouns().length;
        let adjectives = doc.adjectives().length;
        let adverbs = doc.adverbs().length;
        let isquestion = (doc.questions().length > 0) ? true : false;
        let hasquotes = (doc.quotations().length > 0) ? true : false;
        
        if (isquestion) {
          suggestions.push({
            penaltypoints: 0,
            message: "Your user story shouldn't contain any questions"
          })
      
        }
      
        if (hasquotes) {
          suggestions.push({
            penaltypoints: 0,
            message: "Your user story shouldn't contain any quotes"
          })
        }
      
        if (wordcount - 20 > 5) {
          lengthscore -= Math.abs(wordcount - 20);
          suggestions.push({
            penaltypoints: Math.abs(wordcount - 20) *2,
            message: "Your user story is too long. Please shorten it"
          })
        } else if (wordcount < 10) {
          lengthscore -= Math.abs(wordcount - 20);
          suggestions.push({
            penaltypoints: Math.abs(wordcount - 20) *2,
            message: "Your user story is too short. Please make it more descriptive"
          })
        }
      
      
        let verbscore = 10;
        let nounscore = 10;
        let adjectivescore = 10;
        let adverbscore = 10;
      
        if (verbs > 5) {
          verbscore -= verbs
          suggestions.push({
            penaltypoints: verbs *2,
            message: "Don't use too much verbs in your user story. Try to shorten the story or split it up into multiple stories."
          })
        }
        if (adjectives > 3) {
          adjectivescore -= adjectives;
          suggestions.push({
            penaltypoints: adjectives *2,
            message: "Don't use too much adjectives in your user story."
          })
        }
        if (nouns > 3) {
          nounscore -= nouns;
          suggestions.push({
            penaltypoints: nouns *2,
            message: "We think that your user story contains too many different nouns. Try to make it a more singular story or split it into multiple stories."
          })
        }
        if (adverbs > 2) {
          adverbscore -= adverbs;
          suggestions.push({
            penaltypoints: adverbs *2,
            message: "Don't use too many adverbs. It's unnescessary and will make the user story harder to understand for the software engineers"
          })
        }
        return {
          score: (2 * lengthscore) + (2 * verbscore) + (2 * nounscore) + (2 * adjectivescore) + (2 * adverbscore),
          suggestions: suggestions
        };
    }
      
    storyCategories(story){
        let doc = nlp(story)
        return doc.match("#Singular").match("!#Pronoun").out('array')
    }

    storyFeedback() {

      const sp = require('wordsworth').getInstance();

      console.log('working on it!!');

    var data;

      sp.initialize(

        './data/seed.txt',
        './data/training.txt', function() {
      
          data = sp.analyze('This sentense will havv a fiw speling errorrs.');
        }
      );

      return data;



      
  };
    
}

module.exports = new StoryCalculatorService();
