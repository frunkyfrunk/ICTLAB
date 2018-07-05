<template>
    <div>
        <h3>Results</h3>
        <div class="row">
            <div class="col-md-12">
                <div class="result container">
                    <div class="row">
                        <div class="col-md-6"> 
                        <div id="specificChart" class="donut-size">
                            <div class="pie-wrapper">
                                <span class="label">
                                    <span class="num">{{averageUserstoriesScore}}</span><span class="smaller">%</span>
                                </span>
                                <div v-if="averageUserstoriesScore < 50" class="pie" style="clip: rect(auto, auto, auto, auto);">
                                    <div :style="{ transform: 'rotate('+(360 * (averageUserstoriesScore / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                    <div :style="{ transform: 'rotate('+ 180 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                </div>
                                <div v-else class="pie" style="clip: rect(0, 1em, 1em, 0.5em);">
                                    <div :style="{ transform: 'rotate('+(360 * (averageUserstoriesScore/ 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                    <div :style="{ transform: 'rotate('+ 0 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                </div>                  
                                <div class="shadow" style="border-width: 0.1em;"></div>
                                </div>                    
                            </div>
                            <center><span>Users Average</span></center>
                        </div>
                        <div class="col-md-6"> 
                            <div id="specificChart" class="donut-size">
                                <div class="pie-wrapper">
                                    <span class="label">
                                        <span class="num">{{ownAverageUserstoriesScore}}</span><span class="smaller">%</span>
                                    </span>
                                    <div v-if="ownAverageUserstoriesScore < 50" class="pie" style="clip: rect(auto, auto, auto, auto);">
                                        <div :style="{ transform: 'rotate('+(360 * (ownAverageUserstoriesScore / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                        <div :style="{ transform: 'rotate('+ 180 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                    </div>
                                    <div v-else class="pie" style="clip: rect(0, 1em, 1em, 0.5em);">
                                        <div :style="{ transform: 'rotate('+(360 * (ownAverageUserstoriesScore/ 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                        <div :style="{ transform: 'rotate('+ 0 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                    </div>                        
                                    <div class="shadow" style="border-width: 0.1em;"></div>
                                </div>                    
                            </div>
                            <center><span>Your Average</span></center>
                        </div>
                    </div>
                </div>
                <div>
                    <button @click="previousStep()" type="button" class="btn btn-info">Back</button>
                </div>
            </div>

            <div v-if="duplicates.length > 0">
                <div class="col-md-12">
                        <h3>Duplicate stories</h3>
                    </div>
                <div class="col-md-12" v-for="duplicate in duplicates" :key="duplicate.id">
                    <div class="result container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel-heading board">
                                    <textarea readonly type="text" rows="2" class="form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-model=duplicate.story1></textarea>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="panel-heading board">
                                    <textarea readonly type="text" rows="2" class="form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-model=duplicate.story2></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                    <h3>Scoring for each story</h3>
                </div>
            <div class="col-md-12" v-for="card in lambdaCards" :key="card.id">
                <div class="result container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="panel-heading board">
                                <div contenteditable='true' readonly type="text" class="storytext form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-html=card.name></div>
                            </div>
                        </div>
                        <div class="col-md-6"> 
                            <div id="specificChart" class="donut-size">
                                <div class="pie-wrapper">
                                    <span class="label">
                                        <span class="num">{{card.score}}</span><span class="smaller">%</span>
                                    </span>
                                    <div v-if="card.score < 50" class="pie" style="clip: rect(auto, auto, auto, auto);">
                                        <div :style="{ transform: 'rotate('+(360 * (card.score / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                        <div :style="{ transform: 'rotate('+ 180 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                    </div>
                                    <div v-else class="pie" style="clip: rect(0, 1em, 1em, 0.5em);">
                                        <div :style="{ transform: 'rotate('+(360 * (card.score / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                        <div :style="{ transform: 'rotate('+ 0 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                    </div>
                                        <div class="shadow" style="border-width: 0.1em;"></div>
                                    </div>
                                </div>  
                            </div>
                        <div class="col-md-12">
                            <h4>Tags</h4>
                            <span class="badge badge-info" v-for="tag in card.tags" :key="tag.id">
                                {{tag.replace('{"').replace('"}','').replace('.','')}}
                            </span>
                        </div>
                        <div class="col-md-12">
                            <h4>Penalties</h4>
                            <div v-for="suggestion in card.suggestions" :key="suggestion.a" class="alert alert-danger" role="alert">
                                <b>- {{suggestion.penalty}}</b> {{suggestion.message}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "stepfour",
  props: {
    cards: {}
  },
  data() {
    return {
      averageUserstoriesScore: 0,
      ownAverageUserstoriesScore: 0,
      lambdaCards: [],
      duplicates: []
    };
  },
  methods: {
    previousStep(){
        this.$emit("updateStep", 3);
    },
    markAtomic(result){
        var strSpan1 = '<span style="color: red">'
        var strSpan2 = "</span>"
        var mapObj = {
            ' and ': strSpan1 + ' and ' + strSpan2,
            '&': strSpan1 + '&' + strSpan2,
            ' or ': strSpan1 + ' or ' + strSpan2,
            '\+': strSpan1 + '\+' + strSpan2   
        }

        result = result.replace(/ and | '%' | or |'\+'/gi, function(matched){
            return mapObj[matched];
        })

        console.log(result)
        return result;
    },
    getAverage() {
        var result = 0
        for(var i = 0; i < this.lambdaCards.length; i++){
            result = result + this.lambdaCards[i].score
        }
        
        this.ownAverageUserstoriesScore = result / i
        this.ownAverageUserstoriesScore = Math.round(this.ownAverageUserstoriesScore)
    
    },
    getScore(cards) {
      var formattedcards = this.cards.map(card => {
        return { "id": card.id, "story": card.name };
      });
      var $this = this;
      console.log(JSON.stringify(formattedcards))
      $.ajax({
        type: "POST",
        url:
          "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getScore",
        data: JSON.stringify(formattedcards),
        async: false,
        success: function(response) {
          $this.duplicates = response.duplicates;
          for (var i = 0; i < response.stories.length; i++) {
            let card = response.stories[i];
            let score = $this.calculateScore(card.score);
            $this.lambdaCards.push({
              id: card.id,
              name: $this.markAtomic(card.story),
              suggestions: $this.getSuggestionsPenalties(
                card.suggestions,
                score
              ),
              tags: card.analyzed.nlp.tags,
              score: score.total
            });
          }
        $this.getAverage()
        $this.$emit("updateLoading", false);
        }
      });
      
    },
    calculateScore(points) {
      let score = 100;
      var lengthpenalty = Math.pow(points.lengthscore * 0.5, 2);
      var adjectivepenalty = points.adjectivescore;
      var formpenalty = points.formscore;
      var adverbpenalty = points.adverbscore;
      var atomicpenalty = points.atomicscore;
      var minimalpenalty = points.minimalscore;
      var nounpenalty = points.nounscore;
      var verbpenalty = points.verbscore;
      score =
        score -
        lengthpenalty -
        adjectivepenalty -
        formpenalty -
        adverbpenalty -
        atomicpenalty -
        minimalpenalty -
        nounpenalty -
        verbpenalty;
      return {
        total: score < 0 ? 0 : score,
        lengthpenalty: lengthpenalty,
        adjectivepenalty: adjectivepenalty,
        formpenalty: formpenalty,
        adverbpenalty: adverbpenalty,
        atomicpenalty: atomicpenalty,
        minimalpenalty: minimalpenalty,
        nounpenalty: nounpenalty,
        verbpenalty: verbpenalty
      };
    },
    getSuggestionsPenalties(suggestions, score) {
      for (var i in suggestions) {
        let suggestion = suggestions[i];
        if (suggestion.id == 2 || suggestion.id == 3) {
          suggestions[i].penalty = score.lengthpenalty;
        }
        if (suggestion.id == 4) {
          suggestions[i].penalty = score.verbpenalty;
        }
        if (suggestion.id == 5) {
          suggestions[i].penalty = score.adjectivepenalty;
        }
        if (suggestion.id == 6) {
          suggestions[i].penalty = score.nounpenalty;
        }
        if (suggestion.id == 7) {
          suggestions[i].penalty = score.adverbpenalty;
        }
        if (suggestion.id == 8) {
          suggestions[i].penalty = score.atomicpenalty;
        }
        if (suggestion.id == 9) {
          suggestions[i].penalty = score.formpenalty;
        }
        if (suggestion.id == 10) {
          suggestions[i].penalty = score.minimalpenalty;
        }
      }

      return suggestions;
    },

    async getAverageUserStoryScore(){
        // $.ajax({
        //     type: "POST",
        //     url:
        //     "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/saveStories",
        //     data: JSON.stringify(formattedcards),
        //     async: false,
        //     success: function(response) {

        //     }
        // });
        var $self = this;
        $.ajax({
            type: "GET",
            url: "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getAllcardsAverage",
            async:true,
            success: function(response){
                console.log(response)
                $self.averageUserstoriesScore = response
            }
        });
        // var averageUserstoriesScore;
        // await axios
        //         .get(
        //         "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getAllcardsAverage"
        //         )
        //         .then(function(response) {
        //         averageUserstoriesScore = response.data;
        //         console.log("HELLO")
        //         })
        //         .catch(error => error);
        // this.averageUserstoriesScore = averageUserstoriesScore;
    }
  },
  mounted() {
    this.lambdaCards = [];
    this.getScore(this.cards);
    this.getAverageUserStoryScore();
  }
};
</script>