<template>
  <div class="challenge">
    <challenge-intro>
      {{challenge?.title}}
    </challenge-intro>
    <challenge-detail :challenge="challenge"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChallengeDetail from '../components/ChallengeDetail.vue'
import ChallengeIntro from '../components/ChallengeIntro.vue'
export default {
  name: 'challenge',
  components: {
    ChallengeIntro,
    ChallengeDetail
  },
  computed: {
    ...mapState('api', ['challenges']),
    challenge () {
      return this.challenges?.find(({ _id }) => _id === this.$route.params.challenge)
    }
  }
}
</script>
