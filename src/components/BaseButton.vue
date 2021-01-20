<template>
  <component :is="is" :role="role" :to="to" class="base-button">
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    to: null
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
.base-button {
  background: $color-accent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $color-white;

  padding: $spacing;
  border-radius: $border-radius;
  width: 100%;
  border: none;
  font-size: 1em;
}
</style>
