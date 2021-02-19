<template>
  <div class="contribute-camera">
    <div class="video-wrapper">
      <video ref="video" playsinline autoplay :style="videoCover"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mapStateReactive from '@/assets/js/mapStateReactive'
export default {
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
      // photo: null,
      img2: null,
      drawing: null,
      draw: false,
      coords: null,
      pathCount: 0
    }
  },
  mounted () {
    this.initCamera()
  },
  computed: {
    ...mapState('device', ['camera', 'captureWidth', 'captureHeight']),
    ...mapStateReactive('data', ['photo']),
    videoCover () {
      return {
        'min-width': `${100 * this.videoWidth / this.videoHeight}vh`, // 100 * 16 / 9
        height: `${100 * this.videoHeight / this.videoWidth}vw`, // 100 * 9 / 16
        width: '100%',
        'min-height': '100%'
      }
    }
  },
  methods: {
    ...mapActions('data', ['storePhoto']),
    initCamera () {
      if (this.camera == null) return
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

      this.storePhoto(canvas.toDataURL('image/jpeg', 0.7))
      this.$emit('next')
    },
    retake () {
      this.captured = false
      // this.photo = null
      // this.drawing = null
      // this.coords = null
    }
  },
  watch: {
    // statusCamera: {
    //   handler (status) {
    //     if (status === 'allowed') {
    //       this.initCamera()
    //     }
    //   },
    //   immediate: true
    // }
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

  .video-wrapper {
    position: absolute;
  }
  .video-wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-wrapper {
    // margin: 0 #{-$spacing} #{$spacing};
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  video {
    // background: olive;
    // transform: scale(0.2);
    filter: saturate(0) contrast(1.5) brightness(1.15);
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
}
</style>
