<template>
  <div class="base-gallery">
    <base-progress :items="items" :progress="progress" ref="progress" :proportions="proportions"/>
    <div class="interaction-layer">
      <div class="back" @click="back" @touchstart="stop" @touchend="start"/>
      <div class="next" @click="next" @touchstart="stop" @touchend="start"/>
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
    prevItems: {
      type: Number,
      default: null
    },
    pause: {
      type: Boolean,
      default: false
    },
    swipeSkip: {
      type: Boolean,
      default: false
    },
    durations: {
      type: [Array],
      default () {
        return [9000]
      }
    },
    proportions: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      progress: 0,
      stopped: false,
      time: null,
      animation: null,
      swipeStart: null,
      swipeStartTime: null
    }
  },
  computed: {
    step () {
      return Math.floor(this.progress)
    },
    duration () {
      return this.durations[this.step % this.durations.length]
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
        this.progress = (this.prevItems || this.items) - 1
        this.$emit('prev')
      }
    },
    backSkip () {
      this.progress = 0
      this.$emit('prev')
    },
    next () {
      this.progress = (this.step + 1) % this.items
      if (this.progress === 0) this.$emit('next')
    },
    nextSkip () {
      this.progress = 0
      this.$emit('next')
    },
    stop (e) {
      this.swipeStart = e.touches?.[0]?.clientX
      this.swipeStartTime = new Date().getTime()
      this.stopped = true
    },
    start (e) {
      const swipeStop = e.changedTouches?.[0]?.clientX
      const swipeStopTime = new Date().getTime()
      const { swipeStart, swipeStartTime } = this
      const swipeDelta = swipeStop - swipeStart
      const swipeTimeDelta = swipeStopTime - swipeStartTime
      if (swipeTimeDelta < 500 && Math.abs(swipeDelta) > 50) {
        if (this.swipeSkip) {
          if (swipeDelta < 0) {
            this.nextSkip()
          } else {
            this.backSkip()
          }
        } else {
          if (swipeDelta < 0) {
            this.next()
          } else {
            this.back()
          }
        }
        // this.$refs.progress
      }
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
  user-select: none;

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
