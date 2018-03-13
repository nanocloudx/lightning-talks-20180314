<template>
  <div>
    <img
      class="slide"
      :src="imageUrl"
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'slideId'
    ]),
    imageUrl() {
      return `/slides/frokan.${('000' + this.slideId).slice(-3)}.jpeg`
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide {
    width: 100%;
  }
</style>
