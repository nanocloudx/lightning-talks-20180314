<template>
  <div id="app">
    <three />
  </div>
</template>

<script>
  import Three from './components/Three'

  export default {
    name: 'app',
    components: {
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
