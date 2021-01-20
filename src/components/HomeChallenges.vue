<template>
  <div class="home-challenges">
    <h2>Challenges</h2>
    <div class="challenges">
      <challenge-preview v-for="challenge in challenges" :key="challenge._id" v-bind="{challenge}"/>
    </div>
  </div>
</template>

<script>
import ResizeText from 'vue-resize-text/src/VueResizeText'
import { mapState } from 'vuex'
import ChallengePreview from './ChallengePreview.vue'

export default {
  components: { ChallengePreview },
  name: 'home-challenges',
  directives: {
    ResizeText
  },
  computed: {
    ...mapState('api', ['challenges'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.home-challenges {
  padding: $spacing;
  display: flex;
  flex-direction: column;
  color: $color-deep-gray;

  .challenges {
    margin-top: $spacing;
  }
}
</style>
