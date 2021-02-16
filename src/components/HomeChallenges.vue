<template>
  <div class="home-challenges">
    <base-gallery v-if="challenges != null" :items="challenges.length">
      <template v-slot="{ step }">
        <transition name="fade">
          <challenge-detail :key="step" :challenge="challenges[step]"/>
        </transition>
      </template>
    </base-gallery>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseGallery from './BaseGallery.vue'
import ChallengeDetail from './ChallengeDetail.vue'

export default {
  components: { ChallengeDetail, BaseGallery },
  name: 'home-challenges',
  props: {
    step: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState('api', ['challenges'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.home-challenges {
  display: flex;
  flex-direction: column;
  // color: $color-deep-gray;

  .challenges {
    margin-top: $spacing;
  }
}
</style>
