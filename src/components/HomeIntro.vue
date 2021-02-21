<template>
  <div class="home-intro">
    <div class="bg"/>
    <h1>New&nbsp;Normal<br>Neighbourhood</h1>
    <p class="no-hyphens">
      explore and contribute situated <br>
      speculations on local responses <br>
      to&nbsp;potential future crises
    </p>
    <div class="arrow">
      ↓
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-intro'
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.home-intro {
  min-height: 70vh;
  padding: $spacing * 4 $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;

  h1 {
    width: 100%;
    margin-bottom: $spacing;
  }
  p {

  }
  .arrow {
    margin-top: auto;
  }
}
</style>
