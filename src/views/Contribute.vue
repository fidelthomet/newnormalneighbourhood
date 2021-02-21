<template>
  <div class="contribute subpage" :style="{height: `${height}px`}">
    <base-image :img="photo || challenge?.img" :blur="step !== 2 && step !== 4" :tint="step ===  0 || step ===  3" showSlot>
      <contribute-camera v-if="!disableCamera && (step === 1 || step === 2)" ref="camera" @next="step = 3" :challenge="challenge"/>
    </base-image>
    <base-progress :progress="step" :items="5"/>
    <div class="content" :class="{blend: step !== 2}">
      <!-- <router-view :challenge="challenge" @next="next"/> -->
      <transition-group name="fade">
        <contribute-permissions v-if="step === 0" key="permissions" @next="step = 1" :challenge="challenge"/>
        <contribute-chat v-if="step === 1" @next="step = 2" :challenge="challenge"/>
        <div v-if="step === 2" key="capture" class="capture">
          <base-button icon="camera" tint-icon>
            <strong>Capture</strong><br>
            <span>Identify a vulnerable artefact and photograph it</span>
          </base-button>
          <div class="release">
            <svg width="60" height="60" viewBox="-30 -30 60 60">
              <circle class="outline" r="28.5"/>
              <circle @click="capture" class="button" r="24"/>
            </svg>
          </div>
        </div>
        <contribute-text v-if="step === 3" key="text" @next="step = 4"/>
        <contribute-sketch v-if="step === 4" key="sketch"/>
        <!-- <div v-if="step === 4" key="sketch" class="sketch">
          <contribute-task msg="Sketch in Opportunity" icon="camera"/>
          <transition name="fade-alt">
            <div class="buttons"  v-if="$refs.camera.draw && $refs.camera.pathCount > 0">
                <base-button @click="$refs.camera.undo">Undo</base-button>
                <base-button @click="$refs.camera.submit">submit</base-button>
            </div>
          </transition>
        </div> -->
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseButton from '../components/BaseButton.vue'
import BaseImage from '../components/BaseImage.vue'
import BaseProgress from '../components/BaseProgress.vue'
import ContributeCamera from '../components/ContributeCamera.vue'
import ContributeChat from '../components/ContributeChat.vue'
import ContributePermissions from '../components/ContributePermissions.vue'
import ContributeSketch from '../components/ContributeSketch.vue'
import ContributeText from '../components/ContributeText.vue'
export default {
  name: 'contribute',
  components: {
    ContributePermissions,
    BaseImage,
    BaseProgress,
    ContributeChat,
    ContributeCamera,
    ContributeText,
    ContributeSketch,
    BaseButton
  },
  data () {
    return {
      maxStep: 0,
      disableCamera: false
      // height: 0
      // throttle: null
    }
  },
  computed: {
    ...mapState('api', ['challenges']),
    ...mapState('data', ['photo']),
    ...mapState('device', ['height']),
    ...mapGetters('device', ['permissionsGranted']),
    challenge () {
      return this.challenges?.find(({ id }) => id === this.$route.params.challenge)
    },
    step: {
      get () {
        return +this.$route.params.step
      },
      set (step) {
        this.maxStep = Math.max(step, this.maxStep)
        this.$router.push({ name: 'speculate', params: { challenge: this.$route.params.challenge, step } })
        // return this.$route.params.step
      }
    }
  },
  // created () {
  //   addEventListener('resize', this.resize)
  //   this.resize()
  // },
  // beforeUnmount () {
  //   addEventListener('resize', this.resize)
  // },
  methods: {
    capture () {
      this.$refs.camera.capture()
    },
    retake () {
      this.step = 2
      // this.$refs.camera.retake()
    }
    // resize () {
    //   // this.height = innerHeight
    //   // console.log('a', innerHeight)
    //   clearTimeout(this.throttle)
    //   this.throttle = setTimeout(() => {
    //     this.height = innerHeight
    //     console.log('b', innerHeight)
    //   }, 100)
    // }
  },
  watch: {
    step: {
      handler () {
        // window.scrollTo(0, document.body.scrollHeight)
        console.log(this.step, this.maxStep)
        if (this.step > this.maxStep) {
          // this.step = this.maxStep
          return
        }
        if (this.step === 2 && this.maxStep > 2) {
          // this.$refs.camera.retake()
        }
        if (this.step === 3) {
          // this.$refs.camera.captured = true
          // this.$refs.camera.draw = false
        }
        if (this.step === 4) {
          // this.$refs.camera.draw = true
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.contribute {
  // position: absolute;
  // height: 700px;
  // bottom: 0;
  // height: 100vh;

  .base-image {
    position: fixed;
    // z-index: -1;
  }
  .base-progress {
    position: fixed;
  }
  .content {
    width: 100%;
    height: 100%;
    pointer-events: none;
    // &.blend {
    //   mix-blend-mode: hard-light;
    // }
    > * {
      pointer-events: all;
    }
    .capture {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: $page-padding;

      .base-button {
        align-self: flex-start;
      }

      .release {
        // background: green;
        box-shadow: 0px 0px 50px $color-deep-gray;
        background: transparentize($color-deep-gray, $amount: 0.75);
        z-index: 5;
        border-radius: 50%;
        svg {
          display: block;
          .outline {
            fill: none;
            stroke: $color-white;
            stroke-width: 3;
          }
          .button {
            fill: $color-white;
          }
        }
      }
    }
  }
}
</style>
