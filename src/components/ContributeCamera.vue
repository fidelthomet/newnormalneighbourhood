<template>
  <div class="contribute-camera">
    <div ref="wrapper" class="video-wrapper">
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
      wrapperWidth: null,
      wrapperHeight: null,
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
    this.resize()
  },
  computed: {
    ...mapState('device', ['camera', 'width', 'height']),
    ...mapState('config', ['imgWidth', 'imgHeight']),
    ...mapStateReactive('data', ['photo']),
    videoCover () {
      return {
        width: `max(100%, ${this.wrapperHeight * this.videoWidth / this.videoHeight}px)`,
        height: `max(100%, ${this.wrapperWidth * this.videoHeight / this.videoWidth}px)`
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
      this.captured = true
      const video = this.$refs.video
      const canvas = document.createElement('canvas')
      const { imgHeight, imgWidth } = this
      const { width, height } = this.camera.getTracks()[0].getSettings()
      // this.videoWidth = width
      // this.videoHeight = height
      canvas.width = imgWidth
      canvas.height = imgHeight
      const imageWidth = width > height ? width / height * imgHeight : imgWidth
      const imageHeight = height > width ? height / width * imgWidth : imgHeight
      // console.log(imageWidth, imageHeight)
      const imageX = (imgWidth - imageWidth) / 2
      const imageY = (imgHeight - imageHeight) / 2
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, imageX, imageY, imageWidth, imageHeight)
      const imgData = ctx.getImageData(0, 0, imgWidth, imgHeight)
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
    },
    resize () {
      if (this.$refs.wrapper == null) return
      const rect = this.$refs.wrapper.getBoundingClientRect()
      this.wrapperWidth = rect.width
      this.wrapperHeight = rect.height
    }
  },
  watch: {
    width: {
      handler () {
        this.resize()
      }
    },
    height: {
      handler () {
        this.resize()
      }
    }
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
  align-items: center;
    justify-content: center;
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
    // width: 100vw;
    // height: 100vh;
    width: max(100vw, 66.6666vh);
    height: max(100vh, 150vw);
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
