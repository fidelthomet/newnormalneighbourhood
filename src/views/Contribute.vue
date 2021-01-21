<template>
  <div class="contribute">
    <contribute-permissions v-if="!permissionsGranted" :challenge="challenge"/>
    <contribute-camera v-else/>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ContributeCamera from '../components/ContributeCamera.vue'
import ContributePermissions from '../components/ContributePermissions.vue'
export default {
  name: 'contribute',
  components: {
    ContributePermissions,
    ContributeCamera
  },
  computed: {
    ...mapState('api', ['challenges']),
    ...mapGetters('device', ['permissionsGranted']),
    challenge () {
      return this.challenges?.find(({ _id }) => _id === this.$route.params.challenge)
    }
  }
}
</script>
