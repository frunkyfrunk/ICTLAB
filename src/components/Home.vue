<template>
  <div>
    <div v-for="story in stories" class="story">
      <div class="form-group">
      <div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">As a </span>
    </div>
     <input class="form-control col-md-3" v-model="story.role" placeholder="Role"/>
    </div></div><div class="form-group">
    <div class="input-group"><div class="input-group-prepend">
        <span class="input-group-text">I </span>
      
    </div>
     <select class="form-control col-md-2"><option>Want to</option>
     <option>Would like to</option>
     <option>Need to</option></select>
     <input class="form-control col-md-7" v-model="story.goal" placeholder="Goal"/></div></div>
     <div class="form-group">
     <div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">so that I </span>
        
    </div>
    <input v-model="story.reason" class="form-control col-md-8" placeholder="Reason"/></div></div>
</div>
    </div>
    
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      stories: []
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
