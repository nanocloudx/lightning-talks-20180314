<template>
  <div id="app">
    <socket />
    <three />
    <button
      class="fireButton"
      @click="onClickButton"
    >FIRE!</button>
  </div>
</template>

<script>
  import Socket from './components/Socket'
  import Three from './components/Three'

  const socket = window.io()

  export default {
    name: 'app',
    components: {
      Socket,
      Three
    },
    methods: {
      onClickButton() {
        console.log('debug:fire')
        socket.emit('onClickButton')
      }
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fireButton {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
  }
</style>
