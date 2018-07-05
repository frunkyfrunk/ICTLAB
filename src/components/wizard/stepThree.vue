<template>
<div>
    <h3>Step 3: Select your user story to edit</h3>               
    <div class="row">
        <div class="col-md-12">
            <button type="button" class="btn btn-primary" @click="cardModal = true, createNewStory()">Add new user story</button>
            <button type="button" class="btn btn-warning" @click="calculateScore()">Calculate Score</button>
            <button @click="previousStep()" type="button" class="btn btn-info">Back</button>
        </div>
        <card-modal v-if="cardModal" @close="cardModal = false" :modalInfo="modalInfo" :currentCard="currentCard" v-on:update="refreshData()"></card-modal>
        <div class="col-md-12" v-for="card in cards" :key="card.id">
            <div class="storycard" @click="cardModal = true,  currentCard = card">
                <div class="storycard-text">
                    <p>{{card.name}}</p>
                </div>
            </div>
        </div>
    </div>    
</div>
</template>
<script>
import cardModal from "../modals/cardmodal.vue";
export default {
  name: "stepThree",
  components: {
    "card-modal": cardModal
  },
  props: {
    selectedBoard: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      cards: [],
      cardModal: false,
      modalInfo: {},
      boardLists: [],
      currentCard: {}
    };
  },
  methods: {
    previousStep(){
      this.$emit("updateStep", 2);
    },
    calculateScore() {
      this.$emit("updateStep", 4);
      this.$emit("updateCards", this.cards);
    },
    createNewStory() {
      this.currentCard = {};
      this.modalInfo = {
        isNewCard: true,
        boardList: this.boardLists
      };
    },
    EmptyModalInfo() {
      this.modalInfo = {
        isNewCard: false,
        boardList: this.boardLists
      };
    },
    getAllCardsOfSingleBoard() {
      this.cards = "";
      var id = this.selectedBoard.id;
      Trello.boards.get(
        id + "/cards",
        result => {
          //success
          this.cards = result;
        },
        result => {
          //error
          alert(result);
        }
      );
    },
    getListsFromBoards() {
      var id = this.selectedBoard.id;
      Trello.boards.get(
        id + "/lists/",
        result => {
          //success
          this.boardLists = result;
          this.$emit("updateLoading", false);
        },
        result => {
          //error
          alert(result);
        }
      );
    },
    refreshData() {
      this.EmptyModalInfo();
      this.getAllCardsOfSingleBoard();
      this.getListsFromBoards();
    }
  },
  created() {
    this.getAllCardsOfSingleBoard();
    this.getListsFromBoards();
  }
};
</script>
<style>
.storycard-text {
  color: black;
  padding: 10px;
  height: 100%;
  background-color: #edfffd;
  border: 1px solid #5bc0de;
}

.storycard {
  height: 100%;
  padding: 10px;
}

.storycard-text:hover {
  cursor: pointer;
  background-color: #5bc0de;
}
</style>