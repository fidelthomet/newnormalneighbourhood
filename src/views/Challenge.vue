<template>
  <div class="challenge subpage" :style="{height: `${height}px`}">
    <!-- <challenge-intro>
      {{challenge?.title}}
    </challenge-intro>
    <challenge-detail :challenge="challenge"/> -->
      <base-gallery
        :items="speculation == null ? 1 : 3"
        :prevItems="speculationIndex === 0 ? 1 : 3"
        swipeSkip
        @next="next" @prev="prev">
        <template v-slot="{ step }">
          <router-view v-if="challenge" v-slot="{ Component }">
            <transition :name="slideLeft ? 'slide-left' : 'slide-right'">
            <component :is="Component" :key="speculation?._id || challenge.id" :challenge="challenge" :speculation="speculation" :step="step"/>
            </transition>
          </router-view>
        </template>
    </base-gallery>
    <div class="buttons">
      <base-button @click="$router.push({name: 'Home'})" icon="close"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ChallengeDetail from '../components/ChallengeDetail.vue'
import BaseGallery from '../components/BaseGallery.vue'
import BaseButton from '../components/BaseButton.vue'
export default {
  name: 'challenge',
  components: {
    ChallengeDetail,
    BaseGallery,
    BaseButton
  },
  data () {
    return {
      slideLeft: true
    }
  },
  mounted () {
    this.fetchSpeculations()
  },
  computed: {
    ...mapState('api', ['challenges']),
    ...mapState('device', ['height']),
    speculations () {
      return this.$store.getters['api/speculations'](this.challenge.id)
    },
    challenge () {
      return this.challenges?.find(({ id }) => id === this.$route.params.challenge)
    },
    speculation () {
      return this.speculations?.find(({ _id }) => _id === this.$route.params.speculation)
    },
    speculationIndex () {
      if (!this.speculation) return null
      return this.speculations.slice().findIndex(s => s._id === this.speculation._id)
    }
  },
  methods: {
    ...mapActions('api', ['fetchSpeculations']),
    next () {
      this.slideLeft = true
      if (this.speculation == null) {
        const speculation = this.$store.getters['api/speculations'](this.challenge.id)[0]
        this.$router.replace({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
        return
      }
      const index = this.speculations.findIndex(s => s._id === this.speculation._id)
      const speculation = this.speculations.find((s, i) =>
        s.scenario === this.challenge.id && i > index
      )
      if (speculation == null) this.$router.replace({ name: 'scenario', params: { challenge: this.challenge.id } })
      else this.$router.replace({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
    },
    prev () {
      this.slideLeft = false
      if (this.speculation == null) {
        const speculation = this.$store.getters['api/speculations'](this.challenge.id).reverse()[0]
        this.$router.replace({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
        return
      }
      const index = this.speculations.slice().reverse().findIndex(s => s._id === this.speculation._id)
      const speculation = this.speculations.slice().reverse().find((s, i) =>
        s.scenario === this.challenge.id && i > index
      )
      if (speculation == null) {
        this.$router.replace({ name: 'scenario', params: { challenge: this.challenge.id } })
      } else this.$router.replace({ name: 'speculation', params: { challenge: this.challenge.id, speculation: speculation._id } })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/style/global";
.challenge {
  overflow: hidden;
  .buttons {
    position: absolute;
    top: $spacing * 2;
    right: $spacing;
    pointer-events: all;
    z-index: 5;
  }
}
</style>
