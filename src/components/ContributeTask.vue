<template>
  <div class="contribute-task">
    <div class="icon" :class="{light: iconLight}">
      <svg width="16" height="16">
        <g v-if="icon === 'camera'">
          <circle cx="8" cy="8" r="7"/>
          <path d="M8,5 C6.34314575,5 5,6.34314575 5,8"/>
        </g>
        <g v-if="icon === 'type'">
          <polyline points="5 2 8 3 11 2"/>
          <polyline points="5 14 8 13 11 14"/>
          <line x1="8" y1="3" x2="8" y2="13"/>
        </g>
        <g v-if="icon === 'next'">
          <polyline points="8 2 14 8 8 14"/>
          <line x1="12" y1="8" x2="2" y2="8"/>
        </g>
      </svg>
    </div>
    <span v-if="msg != null" class="text" :class="{light}">
      {{msg}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'contribute-task',
  props: {
    msg: {
      type: String,
      default: null
    },
    light: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'camera'
    },
    iconLight: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-task {
  align-self: flex-start;
  display: flex;
  // font-size: 0.8em;
  @include backdrop-blur {
    // background: transparentize($color-black, 0.7);
  };
  .icon {
    background: $color-accent;
    // mix-blend-mode: hard-light;
    @include supports-backdrop-blur {
      background: transparentize($color-white, 0.7);
      // backdrop-filter: saturate(0)
    };
    width: calc(1.25em + #{$spacing});
    min-height: calc(1.25em + #{$spacing});
    padding: $spacing / 2 $spacing;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      overflow: visible;
      position: absolute;
      > g {
        > * {
          fill: none;
          stroke: $color-white;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
      }
    }
  }
  .text {
    padding: $spacing / 2 $spacing;
    background: $color-deep-gray;
    // mix-blend-mode: hard-light;
    @include supports-backdrop-blur {
      background: transparentize($color-deep-gray, 0.7);
    };

    hyphens: auto;

    // &.light {
    //   @include supports-backdrop-blur {
    //     background: transparentize($color-white, 0.7);
    //     backdrop-filter: saturate(0)
    //   };
    // }
  }
}
</style>
