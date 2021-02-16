<template>
  <nav class="the-menu">
    <router-link to="/">
      <svg width="40px" height="40px" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="18"/>
        <polygon transform="translate(-8, -8)" points="22.571599 33 23.4033413 28.3 23.4033413 26.4 23.646778 26.4 26.5274463 33 32.0047733 33 34.5 19 29.428401 19 28.6169451 23.6 28.6169451 25.6 28.3735084 25.6 25.4725537 19 19.9952267 19 17.5 33"/>
      </svg>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'the-menu'
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.the-menu {
  position: fixed;
  z-index: 100;
  display: flex;
  svg {
    margin: $spacing;
    circle {
      fill: $color-black;
    }
    polygon {
      fill: $color-white;
    }
  }
}
</style>
