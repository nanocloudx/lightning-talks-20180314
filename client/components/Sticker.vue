<template>
  <div class="button-container">
    <button class="button" @click="onClickButton(0)">👍それな</button>
    <button class="button" @click="onClickButton(1)">🤔せやろか</button>
    <button class="button" @click="onClickButton(2)">👎つまんない</button>
    <button class="button" @click="onClickButton(3)">😇にゃーん</button>
  </div>
</template>

<script>
import {socket} from '../socket'
export default {
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
