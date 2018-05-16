<template>
  <div>
    <div class="container">
      <div class="wizard">
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
        <div class="container">
          <div class="col-md-12">
            <div class="tab-content">
              <div v-if="step == 1" class="tab-pane active" role="tabpanel">
                  <h3>Step 1: Log In to your Trello account</h3>
              </div>
              <div v-if="step == 2" class="tab-pane active" role="tabpanel">
                <h3>Step 2: Select a board</h3>
                  <div class="row">
                    <div class="col-md-3" 
                      v-for="board in boards" 
                      :key="board.id"
                      @click="selectItem(board.id), selectBoard(board.id)"
                    >
                      <div class="panel panel-default" :class="{highlight:board.id == selected}">
                        <div class="panel-heading board">{{board.name}}</div>
                        <div class="panel-body">
                          <h5>Last Activity</h5>
                          {{board.dateLastActivity | lastDate}}
                        </div>
                      </div>
                    </div>
                  </div>                        
                </div>
                <div v-if="step == 3" class="tab-pane active" role="tabpanel">
                  <h3>Step 3: Select your user story to edit</h3>
                  <h4>Your current score is: </h4>
                  <div class="row">
                    <div class="col-md-3" v-for="card in cards" 
                      :key="card.id" 
                    >
                      <div class="panel panel-default ">
                        <div class="panel-heading board">
                          <textarea type="text" class="cardtext form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-model=card.name></textarea>
                        </div>
                        <div class="panel-body">
                            <button type="button" class="btn btn-default" @click="updateCard(card.id, card.name)">Edit</button>
                            <button type="button" class="btn btn-primary" @click="deleteCard(card.id)">Delete</button>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="panel panel-default ">
                        <div class="panel-heading board">
                          <textarea type="text" class="cardtext form-control" placeholder="Userstory" aria-describedby="basic-addon1" v-model="newCardName"></textarea>
                          <h5>Select List</h5>
                          <select v-model="selectedList" name="selectedList">
                            <option v-for="list in this.boardLists" :key="list.id" :value="list.id">{{list.name}}</option>
                          </select>
                        </div>
                        <div class="panel-body">
                          <button type="button" class="btn btn-info" @click="addCard()">Add</button>
                        </div>
                      </div>
                    </div>
                  </div>             
                </div>
                <div v-if="step == 4" class="tab-pane active" role="tabpanel">
                  <h3>Step {{step}}</h3>
                  <p>This is step {{step}}</p>
                </div>
                <div v-if="step == 1" class="float-right">
                  <button @click="authenticate()" id="loginButton" type="button" class="btn btn-primary">Log in</button>
                </div>
                <div class="float-right">
                 <button type="button" class="btn btn-default prev-step" v-if="step > 2" v-on:click="step -= 1" >Previous</button>
                 <button type="button" class="btn btn-primary next-step" v-if="step < 3 && step > 1" v-on:click="nextstep()" >Next</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>    
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      selected: "", 
      newCardName:"",
      selectedList:"",
      boardLists: [],
      cards: [],
      boards: [],
      step: 1,
      tabs: [
        { id: 1, icon: "fab fa-trello" },
        { id: 2, icon: "fas fa-th-list" },
        { id: 3, icon: "fas fa-user-check" },
        { id: 4, icon: "fas fa-cloud-upload-alt" }
      ]
    };
  },
  mounted() {
    //let $self = this;
  },
  filters: {
    lastDate(date) {
      if (date != null) {
        date = date.substring(0, 9);
        return date;
      }
    }
  },
  methods: {
    selectItem(e) {
      this.selected = e;
    },
    selectBoard(e){
      this.selectedBoard = e;
    },
    addCard(){
      Trello.post(
        "/cards",
        {
          idList:this.selectedList,
          name:this.newCardName
        },
        (result) => {
          //success
          alert("Added");
          this.refreshData();
        },
        (result) => {
          //error
          alert("Add failed");
          console.log(result);
        }
      )
    },
    updateCard(id, text){
      Trello.put(
        "/cards/" + id,
        { name: text },
        result => {
          //success
          alert("Updated");
        },
        result => {
          //error
          alert("Update Failed");
          console.log(result);
        }
      );
    },
    deleteCard(id){
      Trello.delete(
        "/cards/" + id,
        (result) => {
          //success
          alert("Deleted");
          this.refreshData();
        },
        (result) => {
          //error
          alert("Delete Failed");
          console.log(result);
        }
      )
    },
    getAllCardsOfSingleBoard() {
      this.cards = "";
      var id = this.selected;
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
    getListsFromBoards(){
      var id = this.selected;
      Trello.boards.get(
        id + "/lists/",
        (result) => {
          //success
          this.boardLists = result;
        },
        (result) => {
          //error
          alert(result);
        }
      )
    },
    getAllBoards(){
      Trello.members.get(
        "me/boards",
        result => {
          //success
          this.boards = result;
        },
        result => {
          //error
          alert(result);
        }
      );
    },
    authenticate() {
      let $self = this;
      window.Trello.authorize({
        type: "popup",
        name: "Userstory Analyzer",
        scope: {
          read: "true",
          write: "true"
        },
        expiration: "never",
        success: this.authenticationSuccess,
        error: this.authenticationFailure
      });
    },
    authenticationSuccess() {
      alert("Authentication Succeedded");
      this.getAllBoards();
      this.step++;
    },
    authenticationFailure() {
      alert("Authentication Failed");
    },
    nextstep() {
      this.step++;
      if(this.step == 3){
        this.refreshData();
      }
    },
    previousstep() {
      this.step--;
    },
    refreshData(){
      this.getAllCardsOfSingleBoard();
      this.getListsFromBoards();
    }
  }
};
</script>
//getData(c) {
    //   // GET /someUrl
    //   $.ajax({
    //     url:
    //       "https://api.trello.com/1/boards/BwXA7ZZT/cards/all?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f",
    //     method: "GET",
    //     success: function(response) {
    //       c(response.map(i => i.name));
    //     }
    //   });
    // },
// $self.getData(function(response) {
    //   $self.stories = $self.getStories(response);
    // });
    // check(reason) {},
    // ,
    // parseStory(story) {
    //   let sentences = story.split(",");
    //   let role = "";
    //   let goal = "";
    //   let reason = "";
    //   if (sentences.length > 2) {
    //     return {
    //       role: sentences[0].replace(/.*As a\s+|As an\s+(.*).*/i, "$1"),
    //       goal: sentences[1].replace(/.*I [a-z]* ([a-z])* ?to+/i, ""),
    //       reason: sentences[2].replace(/.*so that|so\s+(.*).*/i, "$1"),
    //       full: story
    //     };
    //   } else {
    //     return false;
    //   }
    // },
    // getStories(stories) {
    //   return stories.map(story => this.parseStory(story));
    // }
<!-- <div class="col-md-9">
      <div class="form-group">
      <div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">As a </span>
    </div>
     <input class="form-control col-md-6" v-model="story.role" placeholder="Role"/>
    </div></div><div class="form-group">
    <div class="input-group"><div class="input-group-prepend">
        <span class="input-group-text">I </span>
      
    </div>
     <select class="form-control col-md-2"><option>Want to</option>
     <option>Would like to</option>
     <option>Need to</option></select>
     <input class="form-control col-md-9" v-model="story.goal" placeholder="Goal"/></div></div>
     <div class="form-group">
     <div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">so that I </span>
        
    </div>
    <input v-model="story.reason" class="form-control col-md-8" placeholder="Reason"/></div></div>
</div>
<div class="col-md-3">
  <button type="button" class="btn btn-primary btn-lg">Save story</button>
</div> -->

                      // :class="{highlight:card.id == selected, hover:card.id == hover}"
                      // @click="selectItem(card.id)"
                      // @mouseover="hoverItem(card.id)"