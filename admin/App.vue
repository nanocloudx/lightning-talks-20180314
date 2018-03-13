<template>
  <div id="app">
    <h1 class="info">SlideId: {{ slideId }}</h1>
    <h1 class="info">Connection: {{ connectionNum }}</h1>
    <p class="info">👍{{sticker[0]}} 🤔{{sticker[1]}} 👎{{sticker[2]}} 😇{{sticker[3]}}</p>
    <button class="next-button" @click="onClickNext">NEXT</button>
    <button class="prev-button" @click="onClickPrev">PREV</button>
  </div>
</template>

<script>
  const socket = window.io.connect()

  export default {
    data() {
      return {
        slideId: 1,
        connectionNum: 0,
        sticker: [0, 0, 0, 0]
      }
    },
    mounted() {
      socket.on('initialize', (data) => {
        this.slideId = data.slideId
      })
      socket.on('changeSlide', (data) => {
        this.slideId = data.slideId
      })
      socket.on('connectionNum', (data) => {
        this.connectionNum = data.connectionNum
      })
      socket.on('sticker', (data) => {
        this.sticker = data.sticker
      })
      setInterval(() => {
        socket.emit('connectionNum')
      }, 1000)
    },
    methods: {
      onClickNext() {
        socket.emit('adminNextSlide')
      },
      onClickPrev() {
        socket.emit('adminPrevSlide')
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
  .info {
    font-size: 20px;
    text-align: center;
    padding: 30px;
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
