<template>
  <div class="base-gallery">
    <base-progress :items="items" :progress="progress"/>
    <div class="interaction-layer">
      <div class="back" @click="back" @touchstart="stopp" @touchend="start"/>
      <div class="next" @click="next" @touchstart="stopp" @touchend="start"/>
    </div>
    <slot :progress="progress" :step="step"/>
  </div>
</template>

<script>
import BaseProgress from './BaseProgress.vue'
export default {
  components: { BaseProgress },
  name: 'base-gallery',
  props: {
    items: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      progress: 0,
      stopped: false,
      duration: 6000,
      time: null
    }
  },
  computed: {
    step () {
      return Math.floor(this.progress)
    }
  },
  mounted () {
    requestAnimationFrame(this.animate)
  },
  methods: {
    animate (t) {
      if (this.stopped) return
      if (this.time != null) {
        const delta = (t - this.time) / this.duration
        this.progress = (this.progress + delta) % this.items
      }
      this.time = t
      requestAnimationFrame(this.animate)
    },
    back () {
      this.progress = (this.step + this.items - 1) % this.items
    },
    next () {
      this.progress = (this.step + 1) % this.items
    },
    stopp () {
      this.stopped = true
    },
    start () {
      this.stopped = false
      this.time = null
      requestAnimationFrame(this.animate)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.base-gallery {
  background: $color-black;
  width: 100%;
  height: 100vh;
  position: relative;

  .interaction-layer, .base-progress {
    z-index: 5;
  }

  .interaction-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;

    .back {
      height: 100%;
      flex: 1;
      // background: blue;
      // opacity: 0.2;
      user-select: none;
    }
    .next {
      height: 100%;
      flex: 2;
      // background: red;
      // opacity: 0.2;
      user-select: none;
    }
  }
}
</style>
