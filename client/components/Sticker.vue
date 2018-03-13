<template>
  <div class="button-container">
    <p class="summary"><span>LIVE</span> {{connectionNum}} Connection | 👍{{sticker[0]}} 🤔{{sticker[1]}} 👎{{sticker[2]}} 😇{{sticker[3]}}</p>
    <button class="button" @click="onClickButton(0)">👍それな</button>
    <button class="button" @click="onClickButton(1)">🤔せやろか</button>
    <button class="button" @click="onClickButton(2)">👎つまんない</button>
    <button class="button" @click="onClickButton(3)">😇にゃーん</button>
  </div>
</template>

<script>
import {socket} from '../socket'
export default {
  data() {
    return {
      connectionNum: 0,
      sticker: [0, 0, 0, 0]
    }
  },
  mounted() {
    socket.on('sticker', (data) => {
      this.sticker = data.sticker
    })
    socket.on('connectionNum', (data) => {
      this.connectionNum = data.connectionNum
    })
  },
  methods: {
    onClickButton(stickerId) {
      socket.emit('sticker', stickerId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .button-container {
    background-color: #111111;
    padding: 5px 0;
  }
  .summary {
    font-size: 16px;
    color: #fff;
    span {
      background-color: #f00;
      margin: 0 5px;
    }
  }
  .button {
    width: 100%;
    padding: 20px;
    margin: 5px 0;
    background-color: #333;
    color: #fff;
    font-size: 20px;
    border: none;
  }
</style>
