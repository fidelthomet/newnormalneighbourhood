<template>
  <div role="button" class="base-button-check">
    <svg width="36px" height="2">
      <circle v-if="state === 'unknown'" class="unknown" cx="18" cy="1" r="18"/>
      <circle v-if="state === 'allowed'" class="allowed" cx="18" cy="1" r="18"/>
      <circle v-if="state === 'requested'" class="requested" cx="18" cy="1" r="18"/>
      <circle v-if="state === 'denied'" class="denied" cx="18" cy="1" r="18"/>
    </svg>
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'base-button-check',
  props: [
    'state' // ['allowed', 'unknown', 'requested', 'denied']
  ],
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
.base-button-check {
  background: $color-white;
  display: flex;
  align-items: center;
  // justify-content: center;
  color: $color-accent;

  padding: $spacing;
  border-radius: $border-radius;
  width: 100%;
  border: none;
  font-size: 1em;

  svg {
    overflow: visible;
    margin-right: $spacing;

    circle {
      fill: none;
      stroke: $color-gray;
      stroke-width: 2;

      &.allowed {
        fill: $color-green;
        stroke: $color-dark-green;
      }
      &.requested {
        fill: $color-yellow;
        stroke: $color-dark-yellow;
      }
      &.denied {
        fill: $color-red;
        stroke: $color-dark-red;
      }
    }
  }
}
</style>
