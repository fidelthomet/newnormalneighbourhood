<template>
  <div class="contribute subpage" :style="{height: `${height}px`}">
    <base-image :img="photo || challenge?.img" :blur="step < 2 || step === 3 || step === 5" :tint="step === 0 || step === 3 || step === 5" showSlot>
      <contribute-camera v-if="!disableCamera && (step === 1 || step === 2)" ref="camera" @next="step = maxStep === 4 ? 4 : 3" :challenge="challenge"/>
    </base-image>
    <base-progress :progress="step" :items="5"/>
    <div class="content" :class="{blend: step !== 2}">
      <!-- <router-view :challenge="challenge" @next="next"/> -->
      <transition-group name="fade">
        <contribute-permissions v-if="step === 0" key="permissions" @next="step = 1" :challenge="challenge"/>
        <contribute-chat v-if="step === 1" @next="step = 2" :challenge="challenge"/>
        <div v-if="step === 2" key="capture" class="capture">
          <base-button icon="camera" tint-icon class="task">
            <strong>Capture</strong><br>
            <!-- Capture -->
            <span class="task-detail">Where do you want to place your proposal?</span>
          </base-button>
          <div class="release">
            <svg width="60" height="60" viewBox="-30 -30 60 60">
              <circle class="outline" r="28.5"/>
              <circle @click="capture" class="button" r="24"/>
            </svg>
          </div>
        </div>
        <contribute-text v-if="step === 3" key="text" @next="step = 4"/>
        <contribute-sketch v-if="step === 4" key="sketch" @next="thanks" @retake="step = 2"/>
        <div v-if="step === 5" key="thanks" class="thanks">
          <base-button class="close" @click="close" icon="close"/>
          <h2>Thank you for your proposal!</h2>
          <p>It’s now part of our collection</p>
          <div class="btn">
            <base-button icon="next" @click="explore">Explore the archive</base-button>
          </div>
          <div class="btn share">
            <transition name="fade-alt-2">
              <base-button v-if="!copied" icon="link" key="share" @click="share">Copy link to proposal</base-button>
              <base-button v-else icon="allowed" key="copied">Link copied to clipboard</base-button>
            </transition>
          </div>
          <div class="btn">
            <base-button icon="camera" @click="another">Make another proposal</base-button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
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
    ContributeSketch,
    ContributeText,
    BaseButton
  },
  data () {
    return {
      maxStep: 0,
      disableCamera: false,
      copied: false,
      speculation: null
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
        this.$router.replace({ name: 'speculate', params: { challenge: this.$route.params.challenge, step } })
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
    ...mapActions('data', ['wipe']),
    ...mapActions('device', ['stopCamera']),
    capture () {
      this.$refs.camera.capture()
    },
    retake () {
      this.step = 2
      // this.$refs.camera.retake()`
    },
    thanks (speculation) {
      this.speculation = speculation
      this.step = 5
    },
    share () {
      navigator.clipboard.writeText(`${location.origin}/${this.$route.params.challenge}/${this.speculation?.id}`).then(() => {
        this.copied = true
      })
    },
    explore () {
      this.$router.push({
        name: this.speculation?.id != null ? 'speculation' : 'scenario',
        params: {
          challenge: this.$route.params.challenge,
          speculation: this.speculation?.id
        }
      })
      this.wipe()
      this.stopCamera()
    },
    close () {
      this.$router.push({ name: 'Home' })
      this.wipe()
      this.stopCamera()
    },
    another () {
      this.step = 2
      this.maxStep = 2
      this.wipe()
    }
    // resize () {
    //   // this.height = innerHeight
    //   clearTimeout(this.throttle)
    //   this.throttle = setTimeout(() => {
    //     this.height = innerHeight
    //   }, 100)
    // }
  },
  watch: {
    step: {
      handler () {
        if (this.step > this.maxStep && this.step !== 5) this.step = this.maxStep
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

        &.task {
          .task-detail {
            display: block;
            margin-top: $spacing / 4;
          }
        }
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

    .thanks {
      position: relative;
      z-index: 5;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      // align-items: center;
      padding: $page-padding;
      // max-width: $extra-narrow;

      .btn {
        align-self: flex-start;

        +.btn {
          margin-top: $spacing / 2;
        }
      }

      .close {
        align-self: flex-end;
      }

      h2 {
        margin: $spacing * 4 0 $spacing;
        max-width: $narrow;
      }
      p {
        margin-bottom: $spacing;
      }

      .share {
        white-space: nowrap;
        position: relative;
      }
    }
  }
}
</style>
