<template>
  <component :is="is" :role="role" :to="to" class="base-button" :class="{disabled}">
    <span :class="{secondary}">
      <span class="label">
        <slot/>
      </span>
      <svg v-if="state != null" width="14px" height="2">
        <g transform="translate(7 1)">
          <transition-group name="fade">
            <circle v-if="state === 'unknown'" key="unknown" class="unknown" r="7"/>
            <path v-if="state === 'allowed'" key="allowed" class="allowed" d="M6,-5.5L-1.38461538,5.5L-6,1.5"/>
            <path v-if="state === 'requested'" key="requested" class="requested" d="M0,-7 C-3.86599325,-7 -7,-3.86599325 -7,0 C-7,3.86599325 -3.86599325,7 0,7 C3.86599325,7 7,3.86599325 7,0"/>
            <!-- <circle  cx="7" cy="1" r="7"/> -->
            <path v-if="state === 'denied'" key="denied" class="denied" d="M-5,-5L5,5M-5,5L5,-5"/>
          </transition-group>
        </g>
      </svg>
    </span>
  </component>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    to: null,
    secondary: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    state: {
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
  align-items: center;
  display: inline-block;
  justify-content: flex-start;
  display: flex;
  color: $color-white;
  // width: 200px;
  border: none;
  font-size: 1em;
  z-index: 0;

  > span {
    display: inline-flex;
    align-items: center;
    background: $color-accent;
    // padding: $spacing / 2 $spacing;
    .label {
      $offset: 0.05em;
      padding: calc(#{$spacing / 2} + #{$offset}) $spacing calc(#{$spacing / 2} - #{$offset});
    }

    // text-transform: uppercase;
    // font-weight: 700;
    // mix-blend-mode: hard-light;

    &.secondary {
      background: $color-deep-gray;
    }
  }
  &.disabled {
    opacity: 0.15;
    pointer-events: none;
  }

  svg {
    overflow: visible;
    margin-left: - $spacing / 2;
    margin-right: $spacing;
    circle, path {
      fill: none;
      stroke: $color-white;
      stroke-width: 2;
      stroke-linecap: round;
      &.requested {
        animation: 2s linear infinite running rotate;
      }
      &.denied {
        stroke: $color-accent
      }
    }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
}
</style>
