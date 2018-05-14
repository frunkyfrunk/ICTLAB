<template>
  <div>
    <div class="container">

        <div class="wizard">
            <div class="wizard-inner">
                <div class="connecting-line"></div>
                <ul class="nav nav-tabs" role="tablist">

                    <li v-for="tab in tabs"
            :class="{ active: step == tab.id }" role="presentation">
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
                        <h3>Step 1: Connect to your trello account</h3>
                        <p>This is step {{step}}</p>
                    </div>
                    <div v-if="step == 2" class="tab-pane active" role="tabpanel">
                        <h3>Step 2: Select a board</h3>
                        <p>This is step {{step}}</p>
                    </div>
                    <div v-if="step == 3" class="tab-pane active" role="tabpanel">
                        <h3>Step 3: Check your user stories</h3>
                        <div v-for="story in stories" class="story row">
<div class="col-md-9">
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
</div>
                    </div></div>
                    <div v-if="step == 4" class="tab-pane active" role="tabpanel">
                        <h3>Step {{step}}</h3>
                        <p>This is step {{step}}</p>
                    </div>
                    <div class="float-right">
                      <button type="button" class="btn btn-default prev-step" v-if="step > 1" v-on:click="step -= 1" >Previous</button>
                            <button type="button" class="btn btn-primary next-step" v-if="step < 4" v-on:click="step += 1" >Next</button>
                        </div>
                </div>
                </div>
              </div>
            </form>
   </div>
</div></div>
    
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      stories: [],
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
    let $self = this;
    $self.getData(function(response) {
      $self.stories = $self.getStories(response);
    });
  },
  methods: {
    check(reason) {},
    getData(c) {
      // GET /someUrl
      $.ajax({
        url:
          "https://api.trello.com/1/boards/BwXA7ZZT/cards/all?key=a9ce77430032f94b49e35446c5587c85&token=2ba1977dfaf9099a0c5a85ea7226437d9295bc190e5d8644a25927a749bd414f",
        method: "GET",
        success: function(response) {
          c(response.map(i => i.name));
        }
      });
    },
    nextstep() {
      this.step++;
    },
    previousstep() {
      this.step--;
    },
    parseStory(story) {
      let sentences = story.split(",");
      let role = "";
      let goal = "";
      let reason = "";
      if (sentences.length > 2) {
        return {
          role: sentences[0].replace(/.*As a\s+|As an\s+(.*).*/i, "$1"),
          goal: sentences[1].replace(/.*I [a-z]* ([a-z])* ?to+/i, ""),
          reason: sentences[2].replace(/.*so that|so\s+(.*).*/i, "$1"),
          full: story
        };
      } else {
        return false;
      }
    },
    getStories(stories) {
      return stories.map(story => this.parseStory(story));
    }
  }
};
</script>
