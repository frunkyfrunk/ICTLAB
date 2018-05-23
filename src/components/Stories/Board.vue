<template>
  <div>
      <div class="col-md-12">
            <h2 class="text-center">Board</h2>
            <hr class="hidden-xs">
        </div>
    
    </div>
    
</template>
<script>
export default {
    name: "Board",
    mounted(){
        alert(this.$route.query.id)
    }
}
</script>