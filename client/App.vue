<template>
  <div id="app">
    <socket />
    <slide />
    <sticker />
  </div>
</template>

<script>
  import Socket from './components/Socket'
  import Slide from './components/Slide'
  import Sticker from './components/Sticker'

  export default {
    name: 'app',
    components: {
      Socket,
      Slide,
      Sticker
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
