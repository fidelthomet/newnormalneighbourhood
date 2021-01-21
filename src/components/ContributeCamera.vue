<template>
  <div class="contribute-camera">
    <div v-show="!img1" class="video-wrapper">
      <video ref="video" playsinline autoplay :style="videoCover"/>
    </div>
    <div v-show="img1" class="edit-wrapper">
      <img :src="img1"/>
      <div class="drawing" ref="drawing"/>
    </div>
    <div class="buttons">
      <base-button v-if="!img1" @click="capture">Take Photo</base-button>
      <base-button v-if="img1" @click="retake">Retake</base-button>
      <base-button v-if="img1" @click="undo">Undo</base-button>
    </div>
    <div class="form">
      <!-- <div class="label">Title</div> -->
      <input type="text" v-model="title" placeholder="What did you capture?"/>
      <!-- <div class="label">Description</div> -->
      <textarea v-model="description" placeholder="What is the new normal?"/>
      <base-button @click="submit" :disabled="!enableSubmit">Submit</base-button>
      {{location.coords.latitude.toFixed(5) }} {{ location.coords.longitude.toFixed(5)}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SvgDrawing } from '@svg-drawing/core'
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
      img2: null,
      drawing: null,
      title: '',
      description: '',
      coords: null
    }
  },
  mounted () {
    const { width, height } = this.camera.getTracks()[0].getSettings()
    this.videoWidth = width
    this.videoHeight = height
    this.$refs.video.srcObject = this.camera
  },
  computed: {
    ...mapState('device', ['camera', 'location']),
    videoCover () {
      return this.videoWidth > this.videoHeight ? { height: '100vw' } : { width: '100vw' }
    },
    enableSubmit () {
      return this.captured && this.img1 && this.drawing && this.coords && this.title && this.description
    }
  },
  methods: {
    capture () {
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
      this.drawing = new SvgDrawing(this.$refs.drawing, { delay: 30 })

      this.coords = [
        +this.location.coords.latitude.toFixed(5),
        +this.location.coords.longitude.toFixed(5)
      ]
    },
    retake () {
      this.captured = false
      this.img1 = null
      this.drawing = null
      this.coords = null
    },
    undo () {
      this.drawing.undo()
    },
    submit () {
      console.log('submit')
    }
  }
  // watch: {
  //   'drawing.paths': {
  //     handler (paths) {
  //       console.log(paths)
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-camera {
  min-height: 100vh;
  padding: 0 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;

  .video-wrapper {
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-wrapper, .edit-wrapper {
    margin: 0 #{-$spacing} #{$spacing};
    width: 100vw;
    height: 100vw;
  }

  img, .drawing {
    width: 100vw;
    height: 100vw;
    position: absolute;
  }

  .drawing::v-deep {
    svg {
      path {
        stroke: $color-accent;
        stroke-width: 1.5vw;
      }
    }
  }

  video {
    filter: saturate(0) contrast(1.5) brightness(1.15);
  }
  img {
    filter: contrast(1.5) brightness(1.15);
  }

  .buttons {
    display: flex;
    .base-button {
      // margin-top: $spacing;
      background: $color-white;
      color: $color-accent;

      + .base-button {
        margin-left: $spacing;
      }
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
}
</style>
