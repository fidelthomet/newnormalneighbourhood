<template>
  <div class="contribute-permissions">
    <p>
      Before we start…
    </p>
    <base-button-check :state="statusStorage" @click="allowStorage">Local Storage</base-button-check>
    <base-button-check :state="statusLocation" @click="allowLocation">Location Access</base-button-check>
    <base-button-check :state="statusCamera" @click="allowCamera">Camera Access</base-button-check>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BaseButtonCheck from './BaseButtonCheck.vue'
export default {
  components: { BaseButtonCheck },
  name: 'contribute-permissions',
  computed: {
    ...mapGetters('device', ['statusStorage', 'statusLocation', 'statusCamera'])
  },
  methods: {
    ...mapActions('device', ['allowStorage', 'allowLocation', 'allowCamera'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-permissions {
  min-height: 100vh;
  padding: $spacing * 8 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;

  .base-button, .base-button-check {
    margin-top: $spacing;
    background: $color-white;
    color: $color-accent;
  }
}
</style>
