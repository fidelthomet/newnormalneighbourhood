<template>
  <div class="contribute-sketch">
    <!-- <svg class="sketch" :viewBox="viewBox" ref="sketch"> -->
    <svg class="sketch" :viewBox="viewBox" ref="sketch"
      @touchstart="startDrawing" @mousedown="startDrawing"
      @touchmove="touchDraw" @mousemove="mouseDraw"
      @touchend="endDrawing" @touchcancel="endDrawing"
      @mouseup="endDrawing" @mouseleave="endDrawing" @mouseout="endDrawing">
      <g class="paths">
        <path v-for="p in paths" :key="p.index" :d="p.d" :class="[p.strokeWidth, p.color]"/>
      </g>
      <!-- <g class="texts" :class="{editable: mode !== 'draw' && mode !== 'erase'}">
        <text v-for="t in texts" :key="t.index" :transform="t.transform"
          v-gesture="onGesture">
          <tspan v-for="(l, i) in t.rows" :key="i" :dy="i === 0 ? 64 : 64*1.25" x="0">
            {{l}}
          </tspan>
        </text>
      </g> -->
    </svg>
    <div class="edit" :style="{height: `${height}px`}">
      <div class="taskbar">
        <base-button icon="sketch" tint-icon class="task">
          <strong>Illustrate</strong><br>
          <span class="task-detail">How does your proposal change this neighbourhood?</span>
        </base-button>
      </div>
      <div class="toolbar">
        <div class="btn-group">
          <base-button icon="pen-s" tool :color="color" @click="setMode('draw', 's')" :tint-icon="mode === 'draw' && strokeWidth === 's'" />
          <base-button icon="pen-m" tool :color="color" @click="setMode('draw', 'm')" :tint-icon="mode === 'draw' && strokeWidth === 'm'" />
          <base-button icon="pen-l" tool :color="color" @click="setMode('draw', 'l')" :tint-icon="mode === 'draw' && strokeWidth === 'l'" />
          <base-button icon="erase" tool @click="setMode('erase')" :tint-icon="mode === 'erase'" />
        </div>
        <div class="spacer"/>
        <div class="btn-group">
          <base-button icon="color" color="accent" tool @click="setColor('accent')" :tint-icon="color === 'accent'" :disabled="mode === 'erase'" />
          <base-button icon="color" color="white" tool @click="setColor('white')" :tint-icon="color === 'white'" :disabled="mode === 'erase'" />
          <base-button icon="color" color="black" tool @click="setColor('black')" :tint-icon="color === 'black'" :disabled="mode === 'erase'" />
        </div>
      </div>
      <div class="navbar">
        <base-button :icon="actions.length === 0 ? 'camera' : 'undo'" @click="undo"/>
        <div class="spacer"/>
        <base-button :icon="publishing ? 'requested' : 'publish'" reverse :tint-icon="paths.length > 0" :disabled="paths.length === 0" @click="publish">Publish</base-button>
      </div>
    </div>
    <!-- <div class="text-overlay" :class="{ show: mode === 'type'}">
      <div class="text-input" contenteditable ref="input" @blur="$nextTick(() => setMode(null))">&nbsp;</div>
      <div class="text-buttons">
        <base-button>done</base-button>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import smoothPath from '@/assets/js/smoothPath'
import BaseButton from './BaseButton.vue'
import simplify from 'simplify-js'
import { ShapeInfo, Intersection } from 'kld-intersections'
import gesture from '@/assets/js/gesture'
export default {
  components: { BaseButton },
  name: 'contribute-sketch',
  directives: {
    gesture
  },
  props: {
  },
  data () {
    return {
      mode: 'draw',
      strokeWidth: 'm',
      color: 'accent',
      actions: [],
      transformBy: {
        x: 0,
        y: 0,
        scale: 1
      },
      collapseTask: false,
      eraser: null,
      publishing: false
    }
  },
  mounted () {
  },
  computed: {
    ...mapState('device', ['height']),
    ...mapState('config', ['imgWidth', 'imgHeight']),
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
          return {
            d: action.d || smoothPath(action.points),
            index,
            strokeWidth: action.strokeWidth,
            color: action.color
          }
        }).filter((action, i) => this.erasedPaths.indexOf(i) === -1)
    }
    // texts () {
    //   return this.actions
    //     .filter(action => action.type === 'text')
    //     .map((action) => {
    //       const transform = this.actions.filter(a => a.type === 'transform').reverse().find(a => a.index === action.index)?.transform || action.transform
    //       let text = this.actions.filter(a => a.type === 'edit-text' && a.index === action.index && !a.active).reverse()[0]?.text
    //       if (text == null) text = action.text
    //       if (text === '') return null
    //       return {
    //         rows: text.split('\n'),
    //         transform: `translate(${transform.x} ${transform.y}) scale(${transform.scale}) rotate(${transform.rotate})`,
    //         index: action.index
    //       }
    //     })
    //     .filter(action => action !== null)
    // }
  },
  methods: {
    ...mapActions('data', ['storeSketch']),
    ...mapActions('api', ['commitSpeculation']),
    setMode (mode, strokeWidth) {
      // if (this.mode === 'type') {
      //   if (this.action?.type === 'edit-text') {
      //     this.updateText(this.$refs.input.innerText.trim())
      //   } else {
      //     this.addText(this.$refs.input.innerText.trim())
      //   }
      // }

      // if (mode === this.mode) this.mode = null
      // else
      this.mode = mode
      this.strokeWidth = strokeWidth

      // if (this.mode === 'type') {
      //   this.$refs.input.innerHTML = '&nbsp;'
      //   this.$refs.input.focus()
      // }
    },
    setColor (color) {
      this.color = color
    },
    // addText (text, offset = 0) {
    //   if (text.length === 0) return
    //   this.updateTransform()
    //   this.actions.push({
    //     type: 'text',
    //     text,
    //     transform: {
    //       x: this.imgWidth / 2,
    //       y: (this.height / 4 - this.transformBy.y + offset) * this.transformBy.scale,
    //       scale: this.transformBy.scale,
    //       rotate: 0
    //     },
    //     index: this.actions.filter(action => action.type === 'text').length
    //   })
    // },
    // editText (index) {
    //   this.setMode('type')
    //   this.$refs.input.innerHTML = this.actions.filter(action => (action.type === 'text' || action.type === 'edit-text') && action.index === index).reverse()[0].text.split('\n').join('<br>')
    //   this.actions.push({
    //     type: 'edit-text',
    //     active: true,
    //     index
    //   })
    //   // move cursor to the end of contenteditable
    //   if (document.createRange) {
    //     const range = document.createRange()
    //     range.selectNodeContents(this.$refs.input)
    //     range.collapse(false)
    //     const selection = window.getSelection()
    //     selection.removeAllRanges()
    //     selection.addRange(range)
    //   }
    // },
    // updateText (text) {
    //   this.action.text = text
    //   this.action.active = false
    // },
    // onGesture (event, transform, index) {
    //   if (event === 'tap') {
    //     this.editText(index)
    //     return
    //   }
    //   if (event === 'start') {
    //     this.updateTransform()
    //     this.actions.push({
    //       type: 'transform',
    //       active: true,
    //       index,
    //       transform: this.transformObj(transform, index)
    //     })
    //   } else if (event === 'move') {
    //     if (this.action == null) return
    //     this.action.transform = this.transformObj(transform, index)
    //   } else if (event === 'end') {
    //     this.action.active = false
    //   }
    // },
    startDrawing (e) {
      e.preventDefault()
      if (e.touches?.length > 1) return
      this.updateTransform()

      if (this.mode === 'draw') {
        this.actions.push({
          type: 'path',
          strokeWidth: this.strokeWidth,
          color: this.color,
          active: true,
          points: []
        })
      } else if (this.mode === 'erase') {
        this.eraser = []
      }
    },
    endDrawing (e) {
      e.preventDefault()
      if (e.touches?.length > 1) return
      if (this.mode === 'draw') {
        if (this.action == null) return
        if (this.action.points.length > 1) {
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
      e.preventDefault()
      if (e.touches.length > 1) return
      if (this.mode === 'draw') {
        if (this.action == null) return
        this.draw(e.touches[0])
      } else if (this.mode === 'erase') {
        if (this.eraser == null) return
        this.erase(e.touches[0])
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
    updateTransform () {
      const rect = this.$refs.sketch.getBoundingClientRect()
      this.transformBy.x = rect.x
      this.transformBy.y = rect.y
      this.transformBy.scale = this.imgHeight / rect.height
    },
    transform (e) {
      return {
        x: (e.clientX - this.transformBy.x) * this.transformBy.scale,
        y: (e.clientY - this.transformBy.y) * this.transformBy.scale
      }
    },
    // transformObj (transform, index) {
    //   const current = this.actions
    //     .filter(action => action.type === 'text' || action.type === 'transform')
    //     .reverse()
    //     .find(action => action.index === index && !action.active)

    //   const { transformBy } = this
    //   return {
    //     x: current.transform.x + transform.x * transformBy.scale,
    //     y: current.transform.y + transform.y * transformBy.scale,
    //     rotate: current.transform.rotate + transform.rotate,
    //     scale: current.transform.scale * transform.scale
    //   }
    // },
    undo () {
      if (this.actions.length > 0) this.actions.pop()
      else this.$emit('retake')
    },
    async publish () {
      this.publishing = true
      await this.storeSketch({
        paths: this.paths.map(p => ({ d: p.d, color: p.color, strokeWidth: p.strokeWidth }))
        // texts: this.texts.map(t => ({ transform: t.transform, rows: t.rows }))
      })
      const speculation = await this.commitSpeculation(this.$route.params.challenge)
      this.$emit('next', speculation)
      // this.$router.push({
      //   name: 'speculation',
      //   params: {
      //     challenge: this.$route.params.challenge,
      //     speculation: speculation.id
      //   }
      // })
    }
  },
  watch: {
    // 'actions.length' (length) {
    //   if (length === 0) this.collapseTask = false
    //   else this.collapseTask = true
    // }
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
      stroke-linecap: round;
      stroke-linejoin: round;
      pointer-events: none;
      stroke-width: 25;
      stroke: $color-accent;

      &.s {
        stroke-width: 12.5;
      }
      &.l {
        stroke-width: 50;
      }
      &.white {
        stroke: $color-white;
      }
      &.black {
        stroke: $color-black;
      }
    }
    // .texts {
    //   // pointer-events: none;
    //   text {
    //     fill: $color-accent;
    //     font-size: 64px;
    //     font-weight: 700;
    //     text-anchor: middle;
    //     pointer-events: none;
    //     // dominant-baseline: hanging;
    //     touch-action: none;
    //   }
    //   &.editable {
    //     text {
    //       pointer-events: all;
    //     }
    //   }
    // }

  }

  // .text-overlay {
  //   // z-index: -1;
  //   position: absolute;
  //   width: 100%;
  //   height: 100%;
  //   padding: $page-padding;
  //   padding-top: 25vh;
  //   @include backdrop-blur;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: space-between;
  //   pointer-events: none;
  //   opacity: 0;
  //   transition: opacity $transition;
  //   &.show {
  //     pointer-events: all;
  //     opacity: 1;
  //   }

  //   .text-buttons {
  //     // display: flex;
  //     // width: 100%;
  //     align-self: flex-end;
  //     // justify-content: flex-end;
  //   }

  //   .text-input {
  //     font-size: 64px;
  //     font-weight: 700;
  //     color: $color-accent;
  //     outline: none;
  //     text-align: center;
  //     // white-space: nowrap;

  //     // position: absolute;
  //     // top: 25vh;

  //     // ::v-deep {
  //     //   font-size: 2rem;
  //     // }
  //   }
  // }

  .edit {
    padding: $page-padding;
    width: 100%;
    pointer-events: none;
    display: flex;
    align-self: flex-start;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .toolbar, .taskbar, .navbar {
      width: 100%;
      display: flex;
      justify-content: space-between;

      // .spacer {
      //   flex: 1;
      // }

      .base-button {
        pointer-events: all;
        &.disabled {
          pointer-events: none;
        }
      }

      &.toolbar {
        flex-direction: column;
        align-items: flex-start;

        .spacer {
          height: $spacing * 1.5;
        }

        .btn-group {
          background: $color-deep-gray;
          @include backdrop-blur {
            background: transparentize($color-deep-gray, 0.7);
          };
          border-radius: $spacing / 2;
        }

        .base-button {
          pointer-events: all;
          &.disabled {
            pointer-events: none;
          }
          // &+.base-button {
          //   // margin-top: $spacing / 2;
          // }
        }
      }

      &.taskbar {
        // position: relative;

        .task {
          // position: absolute;
          // z-index: 1;

          .task-detail {
            display: block;
            margin-top: $spacing / 4;
          }
        }
      }
    }
  }
}
</style>
