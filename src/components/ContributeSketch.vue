<template>
  <div class="contribute-sketch">
    <svg v-bind="dims">
      <!-- <rect width="1100" height="1700"/> -->
      <!-- <circle fill="red" cx="0" cy="0" r="50"/>
      <circle fill="red" cx="1200" cy="0" r="50"/>
      <circle fill="red" cx="1200" cy="1800" r="50"/>
      <circle fill="red" cx="0" cy="1800" r="50"/>
      <line x2="1200" transform="translate(0 100)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 200)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 300)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 400)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 500)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 600)" stroke="green" stroke-width="20"/>
      <line x2="1200" transform="translate(0 700)" stroke="green" stroke-width="20"/> -->
      <circle cx="600" cy="900" r="900" fill="red"/>
      <circle cx="600" cy="900" r="800" fill="green"/>
      <circle cx="600" cy="900" r="700" fill="red"/>
      <circle cx="600" cy="900" r="600" fill="green"/>
      <circle cx="600" cy="900" r="500" fill="red"/>
      <circle cx="600" cy="900" r="400" fill="green"/>
      <circle cx="600" cy="900" r="300" fill="red"/>
      <circle cx="600" cy="900" r="200" fill="green"/>
      <circle cx="600" cy="900" r="100" fill="red"/>
      <circle cx="600" cy="900" r="10" fill="green"/>
    </svg>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mapStateReactive from '@/assets/js/mapStateReactive'
export default {
  name: 'contribute-sketch',
  props: {
    challenge: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      captured: false,
      videoWidth: null,
      videoHeight: null,
      img2: null,
      drawing: null,
      draw: false,
      coords: null,
      pathCount: 0
    }
  },
  mounted () {
    // this.initCamera()
  },
  computed: {
    ...mapState('device', ['width', 'height']),
    ...mapState('config', ['imgWidth', 'imgHeight']),
    ...mapStateReactive('data', ['photo']),
    dims () {
      const { imgWidth, imgHeight } = this
      // // const ratio = height / width
      // const imgRatio = imgHeight / imgWidth
      // console.log(width > height / imgRatio)
      return {
        viewBox: `0 0 ${imgWidth} ${imgHeight}`
        // style: {
        //   width: width > height / imgRatio ? '100vw' : `${100 / imgRatio}vh`,
        //   height: width > height / imgRatio ? `${imgRatio * 100}vw` : '100vh'
        // }
        // height: ratio < imgRatio ? height : width * imgRatio
      }
    }
  },
  methods: {
    ...mapActions('data', ['storePhoto'])
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-sketch {
  height: 100vh;
  width: 100vw;
  display: flex;
  // flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: blueviolet;
  opacity: 0.5;
  overflow: hidden;
  position: fixed;

  svg {
    position: absolute;
    display: block;
    width: max(100vw, 66.6666vh);
    height: max(100vh, 150vw);
    // transform: scale(0.95);
    // background: aqua;

  }
}
</style>
