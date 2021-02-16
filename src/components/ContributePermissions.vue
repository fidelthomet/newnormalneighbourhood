<template>
  <div class="contribute-permissions">
    <div class="permissions">
      <p>
        When droughts and heatwaves become the new normal, how does your neighbourhood change?
      </p>
      <p>
        To participate in this speculation you’ll need about 5 minutes and to be outside and close to Berlin Hermannplatz.
      </p>
      <p>
        If you haven’t already, open this website on your phone and head outdoors!
      </p>
      <p>
        You’ll also need to grant access to your geolocation and camera before continuing
      </p>
      <div class="button-group">
        <base-button secondary :state="statusLocation" @click="allowLocation">Allow location access</base-button>
        <base-button secondary :state="statusCamera" @click="allowCamera">Allow camera access</base-button>
        <transition name="fade">
          <base-button v-if="permissionsGranted" class="enter" @click="$emit('next')">Enter the New Normal →</base-button>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButton from './BaseButton.vue'
// import BaseImage from './BaseImage.vue'
export default {
  components: { BaseButton },
  name: 'contribute-permissions',
  props: {
    challenge: {
      type: Object,
      default () { return {} }
    }
  },
  computed: {
    ...mapGetters('device', ['statusLocation', 'statusCamera', 'permissionsGranted'])
  },
  methods: {
    ...mapActions('device', ['allowStorage', 'allowLocation', 'allowCamera'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-permissions {
  height: 100%;
  position: relative;
  // padding: $spacing * 8 $spacing $spacing $spacing;
  // display: flex;
  // flex-direction: column;
  // background: $color-black;

  .permissions {
    display: flex;
    flex-direction: column;
    padding: $spacing * 4 $spacing $spacing $spacing;
    max-width: $extra-narrow;
    p {
      margin-bottom: $spacing;

      &:last-of-type {
        margin-bottom: $spacing
      }
    }
    .button-group {
      margin-bottom: $spacing / 2;
      mix-blend-mode: hard-light;
      .base-button, .base-button-check {
        // display: block;
        margin-bottom: $spacing / 2;
        margin-right: $spacing / 2;
        &:last-child {
          margin-right: 0;
        }
        &.enter {
          font-weight: 700;
          // text-transform: uppercase;
        }
        // background: $color-white;
        // color: $color-accent;
      }
    }
  }
}
</style>
