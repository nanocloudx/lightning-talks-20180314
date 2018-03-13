<template>

</template>

<script>
  import { mapActions } from 'vuex'

  const socket = window.io.connect()

  export default {
    methods: {
      ...mapActions([
        'updateSlideId'
      ])
    },
    mounted() {
      socket.on('initialize', (data) => {
        console.log('initialize', data.slideId)
        this.updateSlideId(data.slideId)
      })
      socket.on('changeSlide', (data) => {
        console.log('changeSlide', data.slideId)
        this.updateSlideId(data.slideId)
      })
    }
  }
</script>
