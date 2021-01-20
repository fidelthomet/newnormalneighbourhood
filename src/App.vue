<template>
  <the-menu/>
  <router-view/>
</template>
<script>
import TheMenu from './components/TheMenu.vue'
import { mapActions } from 'vuex'
export default {
  components: { TheMenu },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('main', ['init'])
  }
}
</script>

<style lang="scss">
@import "@/assets/style/base";
#app {
  display: flex;
  // align-items: center;
  flex-direction: column;
}
</style>
