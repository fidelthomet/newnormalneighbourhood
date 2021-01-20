<template>
  <div class="permissions">
    <challenge-permissions :challenge="challenge"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ChallengePermissions from '../components/ChallengePermissions.vue'
export default {
  name: 'permissions',
  components: {
    ChallengePermissions
  },
  computed: {
    ...mapState('api', ['challenges']),
    challenge () {
      return this.challenges?.find(({ _id }) => _id === this.$route.params.challenge)
    }
  }
}
</script>
