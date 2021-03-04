<template>
  <div class="challenge-detail">
      <!-- <div class="bg" :style="{'background-image': `url(${challenge.img})` }"/> -->
      <base-image :img="challenge.img" blur fade/>
      <div class="detail">
        <h2>{{challenge.title}}</h2>
        <div class="button-group">
          <base-button tint :to="`/${challenge.id}/speculate`">Make Proposal</base-button>
          <base-button :to="`/${challenge.id}/${speculations[0]?._id}`">Explore</base-button>
        </div>
        <div class="description">
          {{challenge.description}}
        </div>
      </div>
    </div>
</template>

<script>
import BaseButton from './BaseButton.vue'
import BaseImage from './BaseImage.vue'
export default {
  components: { BaseButton, BaseImage },
  props: ['challenge'],
  name: 'challenge-detail',
  computed: {
    speculations () {
      return this.$store.getters['api/speculations'](this.challenge.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.challenge-detail {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  background: $color-white;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .detail {
    position: absolute;
    width: 100%;
    padding: $page-padding;

    h2 {
      margin-bottom: $spacing;
      text-shadow: $color-black 0px 0px 50px ;
    }

    .button-group {
      margin-bottom: $spacing / 2;
      display: flex;
      flex-wrap: wrap;
      mix-blend-mode: hard-light;
      z-index: 10;
      pointer-events: none;
      position: relative;
      .base-button {
        pointer-events: all;
        display: flex;
        margin-right: $spacing;
        margin-bottom: $spacing / 2;
        font-weight: 700;
        &::v-deep .label {
          text-transform: uppercase;
          // $offset: 0.1em;
          // padding: calc(#{$spacing / 2} + #{$offset}) $spacing calc(#{$spacing / 2} - #{$offset});
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
    // .base-button {
    //   margin-bottom: $spacing;
    //   display: flex;
    // }
  }

  .description {
    width: 100%;
    margin-bottom: $spacing;
  }
}
</style>
