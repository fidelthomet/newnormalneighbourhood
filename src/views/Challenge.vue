<template>
  <div class="challenge subpage" :style="{height: `${height}px`}">
    <!-- <challenge-intro>
      {{challenge?.title}}
    </challenge-intro>
    <challenge-detail :challenge="challenge"/> -->
    <router-view v-if="challenge" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :challenge="challenge" :speculation="speculation"/>
      </transition>
    </router-view>
    <div class="close" @click="$router.push({name: 'Home'})">
      close
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChallengeDetail from '../components/ChallengeDetail.vue'
// import ChallengeIntro from '../components/ChallengeIntro.vue'
export default {
  name: 'challenge',
  components: {
    // ChallengeIntro,
    ChallengeDetail
  },
  mounted () {
    this.fetchSpeculations()
  },
  computed: {
    ...mapState('api', ['challenges', 'speculations']),
    ...mapState('device', ['height']),
    challenge () {
      return this.challenges?.find(({ id }) => id === this.$route.params.challenge)
    },
    speculation () {
      return this.speculations?.find(({ _id }) => _id === this.$route.params.speculation)
    }
  },
  methods: {
    ...mapActions('api', ['fetchSpeculations'])
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.challenge {
  .close {
    position: absolute;
    top: $spacing;
    right: $spacing;
  }
}
</style>
