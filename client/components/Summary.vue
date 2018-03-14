<template>
    <div>
        <p class="summary"><span>LIVE</span> {{connectionNum}} Connection | 👍{{sticker[0]}} 🤔{{sticker[1]}} 👎{{sticker[2]}} 😇{{sticker[3]}}</p>
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
    }
  }
</script>

<style lang="scss" scoped>
    .summary {
        font-size: 18px;
        background-color: #000;
        padding: 8px;
        color: #fff;
        span {
            background-color: #f00;
            margin: 0 5px;
        }
    }
</style>
