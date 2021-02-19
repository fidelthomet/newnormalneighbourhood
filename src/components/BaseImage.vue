<template>
  <div class="base-image">
    <transition-group name="fade">
      <div v-if="img" key="img" class="img" :class="{blur}" :style="{'background-image': `url(${img})` }"/>
      <div v-if="showSlot" class="slot" key="slot" :class="{blur}">
        <slot/>
      </div>
      <div v-if="blur" key="blur" class="backdrop-blur"/>
      <div v-if="tint" key="tint" class="tint"/>
      <div v-if="darken" key="darken" class="darken"/>
      <div v-if="fade" key="fade" class="fade"/>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'base-image',
  props: {
    to: null,
    img: {
      type: String,
      default: null
    },
    showSlot: {
      type: Boolean,
      default: false
    },
    blur: {
      type: Boolean,
      default: false
    },
    tint: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: false
    },
    darken: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    is () {
      return this.to == null ? 'button' : 'router-link'
    },
    role () {
      return this.to == null ? 'button' : null
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.base-image {
  position: absolute;
  z-index: 0;
  height: 100vh;
  width: 100vw;
  margin: 0vh auto 0vh auto;
  overflow: hidden;

  > div {
    position: absolute;
    width: 100%;
    height: 100%;

    &.img {
      background-size: cover;
      background-position: center center;
      filter: saturate(0) contrast(1.5) brightness(1.15);
    }
    &.blur {
      filter: blur(2vw);
      @supports (backdrop-filter: blur(2vw)) {
        filter: none;
      }
    }
    &.backdrop-blur {
      // margin-top: 3vh; // prevents accent-color bleeding in safari
      @supports (backdrop-filter: blur(2vw)) {
        backdrop-filter: blur(2vw)
      }
    }
    &.tint {
      background: $color-accent;
      mix-blend-mode: hard-light;
    }
    &.darken {
      background: $color-black;
      opacity: 0.5;
      mix-blend-mode: hard-light;
    }
    &.fade {
      background: linear-gradient(transparent, transparentize($color-black, 0.5));
    }
  }
}
</style>
