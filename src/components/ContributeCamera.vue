<template>
  <div class="contribute-camera" v-if="statusCamera === 'allowed'">
    <!-- <transition-group name="delay"> -->
      <div class="video-wrapper">
        <video ref="video" playsinline autoplay :style="videoCover"/>
      </div>
      <div v-show="captured" class="edit-wrapper">
        <!-- <div class="img" :style="{'background-image': `url(${photo})`}"/> -->
        <img class="img" :src="photo">
        <div class="drawing" ref="drawing"/>
      </div>
    <!-- </transition-group> -->
  <!-- <transition name="fade-alt">
      <div class="buttons"  v-if="draw && pathCount > 0">
          <base-button @click="undo">Undo</base-button>
          <base-button @click="submit">submit</base-button>
      </div>
</transition> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { SvgDrawing } from '@svg-drawing/core'
// import BaseButton from './BaseButton.vue'
// import { mapActions, mapGetters } from 'vuex'
// import BaseButton from './BaseButton.vue'
export default {
  // components: { BaseButton },
  // components: { BaseButton },
  name: 'contribute-camera',
  props: {
    challenge: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      captured: false,
      videoWidth: null,
      videoHeight: null,
      photo: null,
      img2: null,
      drawing: null,
      draw: false,
      coords: null,
      pathCount: 0
    }
  },
  mounted () {
  },
  computed: {
    ...mapState('device', ['camera', 'location', 'captureWidth', 'captureHeight']),
    ...mapState('data', ['title', 'description']),
    ...mapGetters('device', ['statusCamera']),
    videoCover () {
      return {
        'min-width': `${100 * this.videoWidth / this.videoHeight}vh`, // 100 * 16 / 9
        height: `${100 * this.videoHeight / this.videoWidth}vw`, // 100 * 9 / 16
        width: '100%',
        'min-height': '100%'
      }
      // return this.videoWidth > this.videoHeight ? { height: '100vmax' } : { width: '100vmax' }
    },
    enableSubmit () {
      return this.captured && this.photo && this.drawing
    }
  },
  methods: {
    ...mapActions('api', ['commitSpeculation']),
    ...mapActions('data', ['wipe']),
    initCamera () {
      const { width, height } = this.camera.getTracks()[0].getSettings()
      this.videoWidth = width
      this.videoHeight = height
      if (width === 0 && height === 0) { // Edge case fix (desktop Safari with hdmi-grabber camera)
        setTimeout(() => { this.initCamera() }, 50)
      } else {
        this.$nextTick(() => {
          this.$refs.video.srcObject = this.camera
        })
      }
    },
    capture () {
      // console.log('capture')
      this.captured = true
      const video = this.$refs.video
      const canvas = document.createElement('canvas')
      const { captureWidth, captureHeight } = this
      const { width, height } = this.camera.getTracks()[0].getSettings()
      // this.videoWidth = width
      // this.videoHeight = height
      canvas.width = captureHeight
      canvas.height = captureWidth
      const imageWidth = width > height ? width / height * captureWidth : captureHeight
      const imageHeight = height > width ? height / width * captureHeight : captureWidth
      // console.log(imageWidth, imageHeight)
      const imageX = (captureHeight - imageWidth) / 2
      const imageY = (captureWidth - imageHeight) / 2
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, imageX, imageY, imageWidth, imageHeight)
      const imgData = ctx.getImageData(0, 0, captureHeight, captureWidth)
      const aPix = imgData.data
      const nPixLen = aPix.length
      for (let nPixel = 0; nPixel < nPixLen; nPixel += 4) {
        aPix[nPixel + 2] = aPix[nPixel + 1] = aPix[nPixel] = (aPix[nPixel] + aPix[nPixel + 1] + aPix[nPixel + 2]) / 3
      }
      ctx.putImageData(imgData, 0, 0)
      this.photo = canvas.toDataURL('image/jpeg', 0.7)
      this.drawing = new SvgDrawing(this.$refs.drawing, { delay: 30 })

      this.coords = [
        +this.location.coords.latitude.toFixed(5),
        +this.location.coords.longitude.toFixed(5)
      ]
      this.$emit('next')
    },
    retake () {
      this.captured = false
      // this.photo = null
      this.drawing = null
      this.coords = null
    },
    undo () {
      console.log(1, this.drawing)
      console.log(this.drawing)
      this.drawing.undo()
      console.log(this.$refs.drawing.children[0].children.length)
    },
    submit () {
      // console.log(this.photo)
      this.draw = false
      this.commitSpeculation({
        scenario: this.challenge.id,
        photo: this.photo,
        sketch: [...this.$refs.drawing.children[0].children].map(el => el.getAttribute('d')),
        coords: this.coords,
        title: this.title,
        description: this.description
      }).then((response) => {
        this.wipe()
        this.$router.push({ name: 'speculation', params: { challenge: this.challenge.id, speculation: response.id } })
      })
    },
    checkDrawingState () { // i am really sorry
      if (!this.draw) return
      this.pathCount = this.$refs.drawing.children[0].children.length
      requestAnimationFrame(this.checkDrawingState)
    }
  },
  watch: {
    statusCamera: {
      handler (status) {
        if (status === 'allowed') {
          this.initCamera()
        }
      },
      immediate: true
    },
    draw: {
      handler (draw) {
        if (draw) this.checkDrawingState()
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-camera {
  height: 100%;
  width: 100vw;
  // padding: 0 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  // background: $color-accent;

  .video-wrapper, .edit-wrapper {
    position: absolute;
  }
  .video-wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-wrapper, .edit-wrapper {
    // margin: 0 #{-$spacing} #{$spacing};
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .img, .drawing {
    width: max(100vw, 66.6666vh);
    height: max(100vh, 150vw);
    background-size: cover;
    background-position: center center;
    position: absolute;
  }

  .drawing::v-deep {
    mix-blend-mode: hard-light;
    svg {
      path {
        stroke: $color-accent;
        stroke-width: 1.5vw;
      }
    }
  }

  video {
    // background: olive;
    // transform: scale(0.2);
    filter: saturate(0) contrast(1.5) brightness(1.15);
  }
  .img {
    // background: olive;
    // transform: scale(0.9);
    // width: max(100vw, 66.6666vh);
    // height: max(100vh, 150vw);
    filter: contrast(1.5) brightness(1.15);
  }

  .buttons {
    position: absolute;
    bottom: 0px;
    display: flex;
    .base-button {
      // margin-top: $spacing;
      background: $color-white;
      // color: $color-accent;

      // + .base-button {
      //   margin-left: $spacing;
      // }
    }
  }

  .form {
    input, textarea {
      display: block;
      appearance: none;
      border: none;
      font-family: 'Firs';
      font-size: 1em;
      outline: none;
      width: 100%;
      padding: $spacing;
      border-radius: $border-radius;
      resize: none;
      margin-top: $spacing;
    }

    textarea {
      height: $spacing * 6;
    }

    .base-button {
      margin-top: $spacing;
      background: $color-white;
      color: $color-accent;

      &:disabled {
        opacity: 0.2;
      }

      + .base-button {
        margin-left: $spacing;
      }
    }
  }
  .delay-leave-active.video-wrapper {
    position: absolute;
    // width: 100%;
    transition: opacity 1s 1s;
  }

  .delay-leave-to {
    opacity: 0;
  }
}
</style>
