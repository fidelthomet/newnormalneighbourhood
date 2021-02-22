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
    },
    pause: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      progress: 0,
      stopped: false,
      duration: 6000,
      time: null,
      animation: null
    }
  },
  computed: {
    step () {
      return Math.floor(this.progress)
    }
  },
  mounted () {
    this.animation = requestAnimationFrame(this.animate)
  },
  unmounted () {
    cancelAnimationFrame(this.animation)
  },
  methods: {
    animate (t) {
      if (this.stopped || this.pause) return
      if (this.time != null) {
        const delta = (t - this.time) / this.duration
        if (this.progress + delta >= this.items) {
          this.$emit('next')
        }
        this.progress = (this.progress + delta) % this.items
      }
      this.time = t
      this.animation = requestAnimationFrame(this.animate)
    },
    back () {
      this.progress = (this.step + this.items - 1) % this.items
      if (this.progress === this.items - 1) {
        this.$emit('prev')
        this.progress = 0
      }
    },
    next () {
      this.progress = (this.step + 1) % this.items
      if (this.progress === 0) this.$emit('next')
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
