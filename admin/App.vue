<template>
  <div id="app">
    <h1 class="slide-id">slide: {{ slideId }}</h1>
    <button class="next-button" @click="onClickNext">NEXT</button>
    <button class="prev-button" @click="onClickPrev">PREV</button>
  </div>
</template>

<script>
  const socket = window.io.connect()

  export default {
    data() {
      return {
        slideId: 1
      }
    },
    mounted() {
      socket.on('initialize', (data) => {
        console.log('initialize', data.slideId)
        this.slideId = data.slideId
      })
      socket.on('changeSlide', (data) => {
        console.log('changeSlide', data.slideId)
        this.slideId = data.slideId
      })
    },
    methods: {
      onClickNext() {
        socket.emit('adminNextSlide')
      },
      onClickPrev() {
        socket.emit('adminPrevSlide')
      },
    }
  }
</script>

<style lang="scss" scoped>
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slide-id {
    font-size: 30px;
    text-align: center;
    padding: 50px;
  }
  .next-button {
    font-size: 20px;
    padding: 50px;
    margin: 20px 0;
    width: 100%;
    border: 3px #00f solid;
  }
  .prev-button {
    font-size: 20px;
    margin: 20px 0;
    padding: 20px 50px;
    width: 100%;
    border: 3px #f00 solid;
  }
</style>
