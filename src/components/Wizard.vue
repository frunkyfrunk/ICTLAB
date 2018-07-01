<template>
  <div class="container">
    <div class="wizard"
    v-bind:class="{wizardAnimation: wizardAnimation}">
      <div class="wizard-inner">
        <div class="connecting-line"></div>
        <ul class="nav nav-tabs" role="tablist">
          <li v-for="tab in tabs" :key="tab.id"
            v-bind:class="{ active: step == tab.id }" role="presentation">
            <a href="#step1" data-toggle="tab" aria-controls="step1" role="tab" title="Step 1">
                <span class="round-tab">
                  <i :class="tab.icon"></i>
                </span>
              </a>
            </li>
          </ul>
        </div>
      <form role="form">
        <div class="col-md-12">
          <div class="tab-content">
            <div v-if="step == 1" class="tab-pane active" role="tabpanel">
              <stepone @updateStep="setStep" @updateLoading="setLoading" @updateAnimation="setAnimation"></stepone>
              <div v-if="loading == true">
                <div class="center loader"></div>
              </div>
            </div>
            <div v-if="step == 2" class="tab-pane active" role="tabpanel">
              <steptwo @updateStep="setStep" @updateLoading="setLoading" @selectBoard="setBoard"></steptwo>
              <div v-if="loading == true">
                <div class="center loader"></div>
              </div>
            </div>
            <div v-if="step == 3" class="tab-pane active" role="tabpanel">
              <stepthree @updateStep="setStep" @updateLoading="setLoading" @updateCards="setCards" :selectedBoard="selectedBoard"></stepthree>
              <div v-if="loading == true">
                <div class="center loader"></div>
              </div>
            </div>
            <div v-if="step == 4" class="tab-pane active" role="tabpanel">
              <stepfour @updateStep="setStep" @updateLoading="setLoading" :selectedBoard="selectedBoard" :cards="cards"></stepfour>
              <div v-if="loading == true">
                <div class="center loader"></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>    
</template>
<script>
import stepone from "./wizard/stepone.vue"
import steptwo from "./wizard/steptwo.vue"
import stepthree from "./wizard/stepthree.vue"
import stepfour from "./wizard/stepfour.vue"
export default {
  name: "Wizard",
  components: {
    "stepone" : stepone,
    "steptwo" : steptwo,
    "stepthree" : stepthree,
    "stepfour" : stepfour,
  },
  data() {
    return {
      wizardAnimation: false,
      loading: false,
      selectedBoard: {},
      step: 1,
      cards:[],
      tabs: [
        { id: 1, icon: "fab fa-trello" },
        { id: 2, icon: "fas fa-th-list" },
        { id: 3, icon: "fas fa-user-check" },
        { id: 4, icon: "fas fa-cloud-upload-alt" }
      ]
    };
  },
  methods: {
    setStep(step){
      console.log("current step is " + step)
      this.step = step
      if(step == 2){
        this.wizardAnimation = true
      }
    },
    setLoading(loading){
      this.loading = loading
    },
    setAnimation(animation){
      this.wizardAnimation = animation
    },
    setBoard(board){
      this.selectedBoard = board
    },
    setCards(cards){
      this.cards = cards
    },
    refreshData() {
      this.getAllCardsOfSingleBoard();
      this.getListsFromBoards();
    }
  }
};
</script>