<template>
  <div class="base-progress">
    <div class="progress" v-for="i in items" :key="i" :style="{flex: proportions ? proportions[i - 1] : null}">
      <div v-if="i <= flooredProgress" class="sub-progress"/>
      <div v-if="i === flooredProgress + 1" class="sub-progress" :style="{width: `${progress % 1 * 100}%`}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-progress',
  props: {
    items: {
      type: Number,
      default: 4
    },
    progress: {
      type: Number,
      default: 2.4
    },
    proportions: {
      type: Array,
      default: null
    }
  },
  computed: {
    flooredProgress () {
      return Math.floor(this.progress)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.base-progress {
  position: absolute;
  padding: $spacing;
  width: 100%;
  display: flex;
  // background: $color-accent;

  .progress {
    background: transparentize($color-white, $amount: 0.7);
    display: flex;
    border-radius: 1.5px;
    height: 3px;
    width: 100%;
    margin-right: $spacing / 2;
    box-shadow: 0px 0px 50px $color-black;
    &:last-child {
      margin-right: 0;
    }

    .sub-progress {
      background: transparentize($color-white, $amount: 0.3);
      border-radius: 1.5px;
      height: 3px;
      width: 100%;
      margin-right: $spacing / 4;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
