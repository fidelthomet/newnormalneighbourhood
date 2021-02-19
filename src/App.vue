<template>
  <!-- <the-menu/> -->
  <!-- <router-view/> -->
  <!-- <resize-observer @notify="handleResize" /> -->
  <router-view v-if="ready" v-slot="{ Component }">
    <transition name="fade">
    <component :is="Component"/>
    </transition>
  </router-view>
</template>
<script>
import TheMenu from './components/TheMenu.vue'
// import { ResizeObserver } from 'vue-resize'
import { mapActions, mapState } from 'vuex'
import mapStateReactive from '@/assets/js/mapStateReactive'
import 'vue-resize/dist/vue-resize.css'
export default {
  components: { TheMenu },
  data () {
    return { resizeDebounce: null }
  },
  created () {
    addEventListener('resize', this.resize)
    this.resize()
  },
  mounted () {
    this.init()
  },
  beforeUnmount () {
    addEventListener('resize', this.resize)
  },
  computed: {
    ...mapStateReactive('device', ['height', 'width']),
    ...mapState('main', ['ready'])
  },
  methods: {
    ...mapActions('main', ['init']),
    // handleResize ({ width, height }) {
    //   console.log(width, height)
    // }
    resize () {
      // this.height = innerHeight
      // console.log('a', innerHeight)
      clearTimeout(this.resizeDebounce)
      this.resizeDebounce = setTimeout(() => {
        this.height = innerHeight
        this.width = innerWidth
      }, 100)
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/base";
#app {
  display: flex;
  // align-items: center;
  flex-direction: column;

  .fade-enter-active,
  .fade-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity 0.4s ease;

    &.subpage {
      position: fixed;
    }
  }

  .fade-alt-enter-active,
  .fade-alt-leave-active {
    transition: opacity 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to,
  .fade-alt-enter-from,
  .fade-alt-leave-to {
    opacity: 0;
  }
}
</style>
