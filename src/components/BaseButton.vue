<template>
  <component :is="is" :role="role" :to="to" class="base-button" :class="{disabled, tint, 'no-label': $slots.default == null}">
    <span v-if="icon != null" class="icon">
      <svg viewBox="-10 -10 20 20">
        <g>
          <transition-group name="fade">
            <circle v-if="icon === 'unknown'" key="unknown" r="7"/>
            <path v-if="icon === 'allowed'" key="allowed" d="M6,-5.5L-1.38461538,5.5L-6,1.5"/>
            <path v-if="icon === 'requested'" key="requested" class="requested" d="M0,-7 C-3.86599325,-7 -7,-3.86599325 -7,0 C-7,3.86599325 -3.86599325,7 0,7 C3.86599325,7 7,3.86599325 7,0"/>
            <!-- <circle  cx="7" cy="1" r="7"/> -->
            <path v-if="icon === 'denied'" key="denied" class="denied" d="M-5,-5L5,5M-5,5L5,-5"/>
            <g v-if="icon === 'next'">
              <polyline points="1 6 7 0 1 -6"/>
              <line x1="-6" y1="0" x2="6" y2="0"/>
            </g>
            <g v-if="icon === 'camera'" transform="translate(-8 -8)">
              <circle cx="8" cy="8" r="7"/>
              <path d="M8,5 C6.34314575,5 5,6.34314575 5,8"/>
            </g>
            <g v-if="icon === 'type'" transform="translate(-8 -8)">
              <polyline points="5 2 8 3 11 2"/>
              <polyline points="5 14 8 13 11 14"/>
              <line x1="8" y1="3" x2="8" y2="13"/>
            </g>
            <g v-if="icon === 'undo'" transform="translate(-6 -6)">
              <polyline id="Path-38" stroke-linejoin="round" points="3 0 0 3 3 6"></polyline>
              <path d="M6,11 L7,11 C9.66666667,11 11,9.66666667 11,7 C11,4.33333333 9.66666667,3 7,3 L0,3" id="Path-39"></path>
            </g>
            <g v-if="icon === 'draw'" transform="translate(-7, -7)">
                <polygon id="Path-46" fill="#FFFFFF" points="10 7 10 0 4 2 4 7"></polygon>
                <polyline id="Path-47" points="-1.28563826e-12 14 1.5 8 3 7 11 7 12.5 8 14 14"></polyline>
            </g>
          </transition-group>
        </g>
      </svg>
    </span>
    <span class="label" v-if="$slots.default">
      <slot/>
    </span>
  </component>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    to: null,
    tint: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    }
  },
  computed: {
    is () {
      return this.to == null ? 'div' : 'router-link'
    },
    role () {
      return this.to == null ? 'button' : null
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.base-button {
  display: flex;
  color: $color-white;
  transition: color $transition;
  border: none;
  font-size: (1em / 1.125);
  z-index: 0;
  @include backdrop-blur;
  .label {
    @include supports-backdrop-blur {
      background: transparentize($color-deep-gray, 0.7);
    };
    $offset: 0.05em;
    padding: calc(#{$spacing / 2} + #{$offset}) $spacing calc(#{$spacing / 2} - #{$offset});
    &.narrow {
      padding: $spacing / 2;
    }
  }

  .icon {
    padding: $spacing / 2;
    background: $color-accent;
    @include supports-backdrop-blur {
      background: transparentize($color-white, 0.7);
    }
    svg {
      display: block;
      overflow: visible;
      width: 1.25em;
      height: 1.25em;
      transition: opacity $transition;

      circle, path, line, polyline {
        fill: none;
        stroke: $color-white;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        &.requested {
          animation: 2s linear infinite running rotate;
        }
        &.denied {
          stroke: $color-accent
        }
      }
    }
  }

  &.disabled {
    // opacity: 0.15;
    pointer-events: none;
    color: transparentize($color-white, 0.75);
    svg {
      opacity: 0.25;
    }
  }

  &.tint {
    .label {
      background: transparentize($color-accent, 0.2);
      mix-blend-mode: hard-light;
      filter: saturate(2)
    }
  }

  &.no-label {
    .icon {
      background: transparentize($color-deep-gray, 0.7);
    }

    &.tint {
      .icon {
        background: transparentize($color-accent, 0.2);
        mix-blend-mode: hard-light;
        filter: saturate(2)
      }
    }
    // .label {
    //   background: transparentize($color-accent, 0.2);
    //   mix-blend-mode: hard-light;
    //   filter: saturate(2)
    // }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
}
</style>
