<template>
  <div class="challenge subpage" :style="{height: `${height}px`}">
    <!-- <challenge-intro>
      {{challenge?.title}}
    </challenge-intro>
    <challenge-detail :challenge="challenge"/> -->
      <base-gallery :items="speculation == null ? 1 : 3"
        @next="next" @prev="prev">
        <template v-slot="{ step }">
          <router-view v-if="challenge" v-slot="{ Component }">
            <transition name="fade">
              <component :is="Component" :challenge="challenge" :speculation="speculation" :step="step"/>
            </transition>
          </router-view>
        </template>
    </base-gallery>
    <div class="close" @click="$router.push({name: 'Home'})">
      close
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChallengeDetail from '../components/ChallengeDetail.vue'
import BaseGallery from '../components/BaseGallery.vue'
export default {
  name: 'challenge',
  components: {
    ChallengeDetail,
    BaseGallery
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
      console.log('a')
      return this.speculations?.find(({ _id }) => _id === this.$route.params.speculation)
    }
  },
  methods: {
    ...mapActions('api', ['fetchSpeculations']),
    next () {
      if (this.speculation == null) {
        const speculation = this.$store.getters['api/speculations'](this.challenge.id)[0]
        this.$router.push({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
        return
      }
      const index = this.speculations.findIndex(s => s._id === this.speculation._id)
      const speculation = this.speculations.find((s, i) =>
        s.scenario === this.challenge.id && i > index
      )
      console.log(speculation)
      if (speculation == null) this.$router.push({ name: 'scenario', params: { challenge: this.challenge.id } })
      else this.$router.push({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
    },
    prev () {
      console.log('prev')
    }
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
