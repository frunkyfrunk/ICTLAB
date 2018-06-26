<template>
  <div>
      <h1>Projects</h1>
      <ul v-for='(story, index) in stories' :key='index'>
        <li>{{story.name}}</li>
      </ul>
    
    
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Projects",
  data() {
    return {
      stories: []
    };
  },
  created() {
    this.getAllProjectsData();
  
  },
  methods: {
    getAllProjectsData() {
        axios.get('https://cd5zq44552.execute-api.eu-central-1.amazonaws.com/dev/myTrelloService/allProjects/api').then(
            response => {this.stories = response.data.data}
        );
    }
  }
};
</script>
