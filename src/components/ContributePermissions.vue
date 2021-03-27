<template>
  <div class="contribute-permissions">
    <div class="permissions">
      <svg class="icon" width="40" height="30" viewBox="0 0 40 30">
        <path :d="challenge.icon"/>
      </svg>
      <p>
        {{challenge?.permissions}}
      </p>
      <p>
        To make a proposal open this website on your phone and go for a walk. It will take about 5 minutes.
      </p>
      <p>
        Before we can get started you’ll also need to allow access to your location and camera.
      </p>
      <div class="button-group">
        <base-button :icon="statusLocation" @click="allowLocation">Allow location access</base-button>
        <base-button :icon="statusCamera" @click="allowCamera">Allow camera access</base-button>
        <base-button icon="next" :disabled="!permissionsGranted" @click="$emit('next')">Enter the New Normal</base-button>
      </div>
      <p class="small-print">
        Your proposal will be published anonymously and&nbsp;under the public domain. <router-link to="/privacy">Learn more</router-link>
      </p>
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
    padding: $page-padding;
    max-width: $extra-narrow;

    .icon {
      margin-top: $spacing * 1.5;
      margin-bottom: $spacing / 2;
      path {
        fill: $color-white;
      }
    }
    p {
      margin-bottom: $spacing;

      &:last-of-type {
        margin-bottom: $spacing
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      // margin-bottom: $spacing / 2;

      .base-button {
        margin-bottom: $spacing / 2;

        &:last-child {
          margin-bottom: 0;
        }
      }
      // // mix-blend-mode: hard-light;
      // .base-button, .base-button-check {
      //   // display: block;
      //   margin-bottom: $spacing / 2;
      //   margin-right: $spacing / 2;
      //   &:last-child {
      //     margin-right: 0;
      //   }
      //   &.enter {
      //     font-weight: 700;
      //     // text-transform: uppercase;
      //   }
      //   // background: $color-white;
      //   // color: $color-accent;
      // }
    }

    .small-print {
      margin-top: $spacing;
      color: $color-accent-dark;
      opacity: 0.8;
      font-size: 0.8em;

      a {
        color: inherit;
        text-decoration: underline;
      }
    }
  }
}
</style>
