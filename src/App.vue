<template>
  <div>
    <header-menu></header-menu>
    <div class="container">
<div class="jumbotron">
  <router-view/>
</div>
<footer-comp></footer-comp>
    </div>
  </div>
</template>

<script>
import HeaderMenu from './components/partials/HeaderMenu'
import Footer from './components/partials/Footer'
export default {
  name: 'App',
  components: {
    "header-menu" : HeaderMenu,
    "footer-comp": Footer
  }
}
</script>
