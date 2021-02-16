<template>
  <div class="home">
    <home-intro/>
    <home-challenges/>
  </div>
</template>

<script>
import HomeChallenges from '../components/HomeChallenges.vue'
import HomeIntro from '../components/HomeIntro.vue'
export default {
  name: 'Home',
  components: {
    HomeIntro,
    HomeChallenges
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
</style>
