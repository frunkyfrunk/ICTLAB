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
            </div>
            <div class="col-md-12" v-for="card in lambdaCards" :key="card.id">
                <div class="result container">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="panel-heading board">
                                <textarea readonly type="text" class="cardtext form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-model=card.name></textarea>
                            </div>
                        </div>
                        <div class="col-md-6"> 
                            <div id="specificChart" class="donut-size">
                                <div class="pie-wrapper">
                                    <span class="label">
                                        <span class="num">{{card.suggestions.score}}</span><span class="smaller">%</span>
                                    </span>
                                    <div v-if="card.suggestions.score < 50" class="pie" style="clip: rect(auto, auto, auto, auto);">
                                        <div :style="{ transform: 'rotate('+(360 * (card.suggestions.score / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
                                        <div :style="{ transform: 'rotate('+ 180 +'deg)'}" class="right-side half-circle" style="border-width: 0.1em;"></div>
                                    </div>
                                    <div v-else class="pie" style="clip: rect(0, 1em, 1em, 0.5em);">
                                        <div :style="{ transform: 'rotate('+(360 * (card.suggestions.score / 100)) +'deg)'}" class="left-side half-circle" style="border-width: 0.1em;transform: rotate(180deg);"></div>
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
                            <div v-for="suggestion in card.suggestions.suggestions" :key="suggestion.id" class="alert alert-danger" role="alert">
                                <b>- {{suggestion.penaltypoints}}</b> {{suggestion.message}}
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
      lambdaCards: []
    };
  },
  methods: {
    getScore(cards) {
      var formattedcards = this.cards.map(card => {
        return { story: card.name };
      });
      $.ajax({
        type: "POST",
        url:
          "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getScore",
        data: JSON.stringify(formattedcards),
        async: false,
        success: function(response) {}
      });
    }
    /*
        async getAverageScoreLambda() {
            var averageUserstoriesScore;
            await axios
                .get(
                "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getAllcardsAverage"
                )
                .then(function(response) {
                averageUserstoriesScore = response.data.data;
                })
                .catch(error => error);
            this.averageUserstoriesScore = averageUserstoriesScore;
        },
        async getLambdas(cards) {
        var ownAverageUserstoriesScore = 0;      
        var tags;
        var suggestions;
        var test = 0;
        var totalBoardScore = 0;
        var formattedcards = this.cards.map(card => {
            return { story: card.name };
        });

        $.ajax({
            type: "POST",
            url:
            "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getStoryCategories",
            data: JSON.stringify(formattedcards),
            async: false,
            success: function(response) {
            tags = response.data;
            console.log(tags);
            }
        });

    // Add stories to database
        $.ajax({
            type: "POST",
            url:
            "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/saveStories",
            data: JSON.stringify(formattedcards),
            async: false,
            success: function(response) {
            }
        });

        $.ajax({
            type: "POST",
            url:
            "https://qfq3vqxrn4.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/getScore",
            data: JSON.stringify(formattedcards),
            async: false,
            success: function(response) {
            suggestions = response.data;

            ownAverageUserstoriesScore = response.averagescore;

            console.log(ownAverageUserstoriesScore);
            console.log(suggestions);
            }
        });

        this.ownAverageUserstoriesScore = ownAverageUserstoriesScore;

        console.log('USER SCORE: ' + this.ownAverageUserstoriesScore);
      
        for (var i = 0; 1 < cards.length; i++) {
            let card = cards[i];
            this.lambdaCards.push({
            id: card.id,
            name: card.name,
            suggestions: suggestions[i],
            tags: tags[i]
            });
        }
        
        console.log(this.lambdaCards);
        this.loading = false;
        }*/
  },
  mounted() {
    this.lambdaCards = [];
    this.getScore(this.cards);
    this.$store.commit("addBoard", {
      id: this.selectedBoard.id,
      name: this.selectedBoard.name,
      cards: this.lambdaCards
    });
  }
};
</script>