<template>
  <div>
      <div class="col-md-12">
            <h2 class="text-center">Saved boards</h2>
            <hr class="hidden-xs">
        </div>
    <div class="col-md-3" 
                      v-for="board in boards" 
                      :key="board.id"
                      @click="viewBoard(board.id)"
                    >
                      <div class="panel panel-default" :class="{highlight:board.id == selected}">
                        <div class="panel-heading board">{{board.name}}</div>
                        <div class="panel-body">
                          <h5>{{board.cards.length + 1}} stories</h5>
                        </div>
                      </div>
                    </div>
    
    </div>
    
</template>
<script>

export default {
    name: "Stories",
    computed: {
    boards: function () {
      return this.$store.state.computedboards
    }
  },
  methods :{
      viewBoard(id){
          this.$router.push({ path: `/Stories/Board?id=${id}` }) 
      }
  }
}
</script>