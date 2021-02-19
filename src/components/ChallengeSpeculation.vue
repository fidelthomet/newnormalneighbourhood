<template>
  <div class="challenge-speculation">
      <!-- <div class="bg" :style="{'background-image': `url(${challenge.img})` }"/> -->

          <base-image :blur="step === 1" :tint="step === 1" showSlot>
            <div class="img-wrapper">
              <!-- <div class="img" :style="{'background-image': `url(${photo})`}"/> -->
              <img class="img" :src="speculation.img">
              <transition name="fade-alt">
                <div v-if="step === 2" class="drawing" ref="drawing">
                  <svg :viewBox="`0 0 ${details.sketchDimensions[0]} ${details.sketchDimensions[1]}`">
                    <path :style="{'stroke-width': details.sketchDimensions[0] * 0.02}" v-for="(path, i) in details.sketch" :key="i" :d="path"/>
                  </svg>
                </div>
              </transition>
            </div>
          </base-image>
          <transition name="fade">
            <div class="text-layer" v-if="step === 1">
              <h2>{{details.title}}</h2>
              <p>{{details.description}}</p>
            </div>
          </transition>
      <!-- <div class="detail">
        <h2>{{challenge.title}}</h2>
        <div class="button-group">
          <base-button :to="`/${challenge.id}/speculate`">speculate</base-button>
          <base-button secondary :to="`/${challenge.id}/${speculations[0]?._id}`">explore</base-button>
        </div>
        <div class="description">
          {{challenge.description}}
        </div>
      </div> -->
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import BaseButton from './BaseButton.vue'
import BaseImage from './BaseImage.vue'
export default {
  components: { BaseImage },
  props: ['challenge', 'speculation', 'step'],
  name: 'challenge-speculation',
  computed: {
    ...mapState('api', {
      details: 'speculation'
    })
  },
  methods: {
    ...mapActions('api', ['fetchSpeculation'])
  },
  watch: {
    'speculation._id': {
      handler (id) {
        if (id != null) this.fetchSpeculation(id)
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-speculation {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  background: $color-white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .img-wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .img, .drawing {
      width: max(100vw, 66.6666vh);
      height: max(100vh, 150vw);
      background-size: cover;
      background-position: center center;
      position: absolute;
    }

    .drawing {
      mix-blend-mode: hard-light;
      svg {
        width: 100%;
        height: 100%;
        path {
          stroke: $color-accent;
          stroke-width: 1.5vw;
          fill: none;
        }
      }
    }
    .img {
      filter: contrast(1.5) brightness(1.15);
    }
  }
  .text-layer {
    position: absolute;
    padding: $spacing * 4 $spacing $spacing * 2;

    // h2 {
    //   text-transform: capitalize;
    // }

    p {
      margin-top: $spacing;
      hyphens: auto;
    }
  }
}
</style>
