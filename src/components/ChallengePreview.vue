<template>
  <router-link :to="`/challenge/${challenge._id}`" class="challenge-preview">
    <div class="details">
      <h3>{{ challenge.title }}</h3>
      <div class="challenges">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'challenge-preview',
  props: ['challenge']
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-preview {
  padding: $spacing;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: $color-accent;
  border-radius: $border-radius;
  min-height: 300px;

  .details {
    margin: -$spacing;
    padding: $spacing;
    border-radius: 0 0 $border-radius $border-radius;
    background: $color-black;
    color: $color-white;
  }
}
</style>
