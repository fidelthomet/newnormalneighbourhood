<template>
  <div class="challenge-detail">
      <div class="description">
        {{challenge?.description}}
      </div>
      <base-button :to="`/challenge/${challenge?._id}/contribute`">contribute</base-button>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
export default {
  components: { BaseButton },
  props: ['challenge'],
  name: 'challenge-detail'
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-detail {
  padding: $spacing;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  background-position: center bottom;

  .description {
    width: 100%;
    margin-bottom: $spacing;
  }
}
</style>
