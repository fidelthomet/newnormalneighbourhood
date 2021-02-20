<template>
  <div class="contribute-sketch">
    <svg class="sketch" :viewBox="viewBox" ref="sketch"
      @touchstart="startDrawing" @mousedown="startDrawing"
      @touchmove="touchDraw" @mousemove="mouseDraw"
      @touchend="endDrawing" @touchcancel="endDrawing"
      @mouseup="endDrawing" @mouseleave="endDrawing" @mouseout="endDrawing">
      <g class="paths">
        <path v-for="(p) in paths" :key="p.index" :d="p.d"
          @touchmove="erase(p.index, 'path')"/>
      </g>
    </svg>
    <div class="edit" :style="{height: `${height}px`}">
      <div class="toolbar">instructions</div>
      <div class="toolbar">
        <base-button icon="undo" :disabled="actions.length === 0" @click="undo"/>
        <div class="spacer"/>
        <base-button icon="type" @click="setMode('type')" :tint="mode === 'type'" />
        <base-button icon="erase" @click="setMode('erase')" :tint="mode === 'erase'" />
        <base-button icon="draw" @click="setMode('draw')" :tint="mode === 'draw'" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import mapStateReactive from '@/assets/js/mapStateReactive'
import smoothPath from '@/assets/js/smoothPath'
import BaseButton from './BaseButton.vue'
// eslint-disable-next-line no-unused-vars
import simplify from 'simplify-js'
const { ShapeInfo, Intersection } = require('kld-intersections')
export default {
  components: { BaseButton },
  name: 'contribute-sketch',
  props: {
  },
  data () {
    return {
      mode: null,
      actions: [],
      transformBy: {
        x: 0,
        y: 0,
        scale: 1
      },
      eraser: null
    }
  },
  mounted () {
    // this.initCamera()
  },
  computed: {
    ...mapState('device', ['height']),
    ...mapState('config', ['imgWidth', 'imgHeight']),
    ...mapStateReactive('data', ['photo']),
    viewBox () {
      return `0 0 ${this.imgWidth} ${this.imgHeight}`
    },
    action () {
      return this.actions[this.actions.length - 1]?.active ? this.actions[this.actions.length - 1] : null
    },
    erasedPaths () {
      return this.actions
        .filter(action => action.type === 'erased-path').map(action => action.index)
    },
    paths () {
      return this.actions
        .filter(action => action.type === 'path' && action.points.length > 0)
        .map((action, index) => {
          // const d = smoothPath(action.points)
          return {
            // d: action.d || smoothPath(simplify(action.points, 10)),
            // d: action.d || `M${action.points.map(p => `${p[0]},${p[1]}`).join('L')}`,
            d: action.d || smoothPath(action.points),
            index
          }
        }).filter((action, i) => this.erasedPaths.indexOf(i) === -1)
    }
  },
  methods: {
    ...mapActions('data', ['storePhoto']),
    setMode (mode) {
      if (mode === this.mode) this.mode = null
      else this.mode = mode
    },
    startDrawing (e) {
      if (e.touches?.length > 1) return
      e.preventDefault()
      const rect = this.$refs.sketch.getBoundingClientRect()
      this.transformBy.x = rect.x
      this.transformBy.y = rect.y
      this.transformBy.scale = this.imgHeight / rect.height

      if (this.mode === 'draw') {
        this.actions.push({
          type: 'path',
          active: true,
          points: []
        })
      } else if (this.mode === 'erase') {
        this.eraser = []
      }
    },
    endDrawing (e) {
      if (e.touches?.length > 1) return
      e.preventDefault()
      if (this.mode === 'draw') {
        if (this.action == null) return
        if (this.action.points.length > 1) {
          console.log(this.action.points.length, simplify(this.action.points, 1).length)
          // console.log(this.action.points, simplify(this.action.points, 1))
          this.action.d = smoothPath(simplify(this.action.points, 1))
          this.action.active = false
        } else {
          this.undo()
        }
      } else if (this.mode === 'erase') {
        this.eraser = null
      }
    },
    touchDraw (e) {
      if (e.touches.length > 1) return
      e.preventDefault()
      if (this.mode === 'draw') {
        if (this.action == null) return
        this.draw(e.touches[0])
      } else if (this.mode === 'erase') {
        if (this.eraser == null) return
        this.erase(e.touches[0])
        // console.log(document.elementFromPoint(e.touches[0].clientX, e.touches[0].pageY))
      }
    },
    mouseDraw (e) {
      e.preventDefault()
      if (this.mode === 'draw') {
        if (this.action == null) return
        this.draw(e)
      } else if (this.mode === 'erase') {
        if (this.eraser == null) return
        this.erase(e)
      }
    },
    draw (e) {
      const { x, y } = this.transform(e)
      this.action.points.push([x, y])
    },
    erase (e) {
      const { x, y } = this.transform(e)
      this.eraser.push([x, y])
      if (this.eraser.length > 5) {
        this.eraser.shift()
      }
      if (this.eraser.length > 2) {
        const eraser = ShapeInfo.polyline(...this.eraser)
        this.paths.forEach(p => {
          const path = ShapeInfo.path(p.d)
          const intersections = Intersection.intersect(eraser, path)
          if (intersections.points.length > 0) {
            this.actions.push({
              type: 'erased-path',
              index: p.index
            })
          }
        })
      }
    },
    // erase (index, el) {
    //   console.log(index)
    //   if (this.mode !== 'erase' || this.erasedPaths.indexOf(index) !== -1) return
    //   this.actions.push({
    //     type: `erased-${el}`,
    //     index
    //   })
    // },
    transform (e) {
      return {
        x: (e.clientX - this.transformBy.x) * this.transformBy.scale,
        y: (e.clientY - this.transformBy.y) * this.transformBy.scale
      }
    },
    undo () {
      this.actions.pop()
    }
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
  // opacity: 0.5;
  overflow: hidden;
  position: fixed;

  .sketch {
    position: absolute;
    display: block;
    width: max(100vw, 66.6666vh);
    height: max(100vh, 150vw);

    path {
      fill: none;
      stroke: $color-accent;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 20;
      pointer-events: none;
    }
    polyline {
      fill: none;
      stroke: aqua;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 20;
    }

  }

  .edit {
    padding: $page-padding;
    width: 100%;
    pointer-events: none;
    display: flex;
    align-self: flex-start;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .toolbar {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      .spacer {
        flex: 1;
      }

      .base-button {
        pointer-events: all;
        &+.base-button {
          margin-left: $spacing;
        }
      }
    }
  }
}
</style>
