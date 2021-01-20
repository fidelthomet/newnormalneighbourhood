<template>
  <div class="challenge-intro">
    <h1>
      <slot/>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'challenge-intro'
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-intro {
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
