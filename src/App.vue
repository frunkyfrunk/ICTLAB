<template>
  <div>
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">

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
