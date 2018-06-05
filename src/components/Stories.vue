<template>
  <div>
      <div class="col-md-12">
            <h2 class="text-center">Saved stories</h2>
            <hr class="hidden-xs">
        </div>
    <div v-for="story in stories" class="story row">
<div class="col-md-9">
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
<div class="col-md-3">
<div class="panel status panel-danger">
                <div class="panel-heading">
                    <h1 class="panel-title text-center">25</h1>
                </div>
                <div class="panel-body text-center">                        
                    <strong>Late</strong>
                </div>
            </div></div>
    </div>
    
    </div>
    
</template>
<script>
export default {
    name: "Stories"
}
</script>