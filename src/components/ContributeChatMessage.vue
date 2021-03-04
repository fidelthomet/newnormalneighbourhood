<template>
  <span class="contribute-chat-message" :class="{user}">
    <base-button v-if="!typing" :icon="icon" :tint="user && icon == null" :tint-icon="user"
      :anchor="icon ? null : user ? 'right' : 'left'">{{ msg }}</base-button>
    <base-button v-else class="typing">
      <!-- <wbr /> -->
      <svg height="5" width="25">
        <g transform="translate(2.5 2.5)">
          <circle cx="00" r="2.5"/>
          <circle cx="10" r="2.5"/>
          <circle cx="20" r="2.5"/>
        </g>
      </svg>
    </base-button>
  </span>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  name: 'contribute-chat-message',
  props: {
    msg: {
      type: String,
      default: ''
    },
    typing: {
      type: Boolean,
      default: false
    },
    user: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-chat-message {
  max-width: 85%;
  .base-button {
    hyphens: auto;
    align-self: flex-start;
    display: inline-flex;

    // display: inline-block;
    // padding: $spacing / 2 $spacing;
    margin-bottom: $spacing / 2;
    &.typing {
      display: inline-flex;
      align-items: center;
      min-height: calc(1.25em + #{$spacing});
      svg {
        // height: 1em;
        circle {
          fill: $color-white;
          animation: 0.5s linear infinite alternate pulse;

          &:nth-child(1) {
            animation-delay: -.4s;
            // fill: red;
          }
          &:nth-child(2) {
            animation-delay: -.2s;
          }
        }
      }
    }
  }
  &.user {
    align-self: flex-end;
    span {
      background: $color-accent;
    }
  }
  @keyframes pulse {
    from { opacity: 1; }
    to   { opacity: 0.4; }
  }
}
</style>
