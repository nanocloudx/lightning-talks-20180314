<template>
  <div id="app">
    <socket />
    <three />
  </div>
</template>

<script>
  import Socket from './components/Socket'
  import Three from './components/Three'

  export default {
    name: 'app',
    components: {
      Socket,
      Three
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
