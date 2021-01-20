<template>
  <div class="challenge-permissions">
    <p>
      Before we start…
    </p>
    <base-button>Local Storage</base-button>
    <base-button @click="allowGeolocation">Location Access</base-button>
    <base-button>Camera Access</base-button>
    <base-button :to="`/challenge/${challenge?._id}/form`">continue</base-button>
  </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  props: ['challenge'],
  name: 'challenge-permissions',
  methods: {
    allowGeolocation () {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      function success (pos) {
        var crd = pos.coords

        console.log('Your current position is:')
        console.log(`${crd.latitude},${crd.longitude}`)
        console.log(`More or less ${crd.accuracy} meters.`)
      }

      function error (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      navigator.geolocation.watchPosition(success, error, options)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-permissions {
  min-height: 100vh;
  padding: $spacing * 8 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;
  text-transform: uppercase;

  .base-button {
    margin-top: $spacing;
    background: $color-white;
    color: $color-accent;
  }
}
</style>
