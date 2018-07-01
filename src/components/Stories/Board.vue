<template>
    <div>
        <div class="col-md-12">
            <h2 class="text-center">Board {{board.name}}</h2>       
            <hr class="hidden-xs">
        </div>
    </div>
</template>

<script>
export default {
    name: "Board",
    
    computed:{
        board: function () {
        if(this.$route.query.id != null){
            return this.$store.state.computedboards[this.$route.query.id]
        }
        }
            }
}
</script>