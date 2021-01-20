<template>
  <div class="home-intro">
    <h1 v-resize-text="{ratio:1.2, minFontSize: '30px', maxFontSize: '75px', delay: 200}">New&nbsp;Normal<br>Neighbourhood</h1>
  </div>
</template>

<script>
import ResizeText from 'vue-resize-text/src/VueResizeText'
export default {
  name: 'home-intro',
  directives: {
    ResizeText
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.home-intro {
  min-height: 60vh;
  padding: $spacing;
  display: flex;
  align-items: flex-end;
  background: url("~@/assets/img/estrel.jpg");
  background-size: cover;
  background-position: center bottom;
  text-transform: uppercase;
  h1 {
    width: 100%;
  }
}
</style>
