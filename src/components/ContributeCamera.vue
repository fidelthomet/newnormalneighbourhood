<template>
  <div class="contribute-camera">
    <div v-show="!img1" class="video-wrapper">
      <video ref="video" playsinline autoplay :style="videoCover"/>
    </div>
    <div v-if="img1" class="edit-wrapper">
      <img :src="img1"/>
    </div>
    <base-button @click="capture">Take snapshot</base-button>

  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { mapActions, mapGetters } from 'vuex'
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  name: 'contribute-camera',
  data () {
    return {
      captured: false,
      videoWidth: null,
      videoHeight: null,
      img1: null,
      img2: null
    }
  },
  mounted () {
    const { width, height } = this.camera.getTracks()[0].getSettings()
    this.videoWidth = width
    this.videoHeight = height
    this.$refs.video.srcObject = this.camera
  },
  computed: {
    ...mapState('device', ['camera']),
    videoCover () {
      return this.videoWidth > this.videoHeight ? { height: '100vw' } : { width: '100vw' }
    }
  },
  methods: {
    capture () {
      if (this.captured) {
        this.captured = false
        this.img1 = null
        return
      }
      this.captured = true
      const video = this.$refs.video
      const canvas = document.createElement('canvas')
      const captureSize = 2048
      canvas.width = captureSize
      canvas.height = captureSize
      const imageWidth = this.videoWidth > this.videoHeight ? this.videoWidth / this.videoHeight * captureSize : captureSize
      const imageHeight = this.videoHeight > this.videoWidth ? this.videoHeight / this.videoWidth * captureSize : captureSize
      const imageX = (captureSize - imageWidth) / 2
      const imageY = (captureSize - imageHeight) / 2
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, imageX, imageY, imageWidth, imageHeight)
      const imgData = ctx.getImageData(0, 0, captureSize, captureSize)
      const aPix = imgData.data
      const nPixLen = aPix.length
      for (let nPixel = 0; nPixel < nPixLen; nPixel += 4) {
        aPix[nPixel + 2] = aPix[nPixel + 1] = aPix[nPixel] = (aPix[nPixel] + aPix[nPixel + 1] + aPix[nPixel + 2]) / 3
      }
      ctx.putImageData(imgData, 0, 0)
      this.img1 = canvas.toDataURL('image/jpeg', 0.7)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-camera {
  min-height: 100vh;
  padding: $spacing * 8 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;

  .video-wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-wrapper, img {
    margin: 0 #{-$spacing} #{$spacing};
    width: 100vw;
    height: 100vw;
  }

  video {
    filter: saturate(0) contrast(1.5) brightness(1.15);
  }
  img {
    filter: contrast(1.5) brightness(1.15);
  }

  .base-button, .base-button-check {
    margin-top: $spacing;
    background: $color-white;
    color: $color-accent;
  }
}
</style>
