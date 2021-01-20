<template>
  <div class="home">
    <home-intro/>
    <home-challenges/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import HomeChallenges from '../components/HomeChallenges.vue'
import HomeIntro from '../components/HomeIntro.vue'
export default {
  name: 'Home',
  components: {
    HomeIntro,
    HomeChallenges
  },
  mounted () {
    console.log(this.$route.params.challenge)
  },
  methods: {
    ...mapActions('main', ['init'])
  }
}
</script>
