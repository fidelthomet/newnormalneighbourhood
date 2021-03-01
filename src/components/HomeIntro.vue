<template>
  <div class="home-intro">
    <div class="bg"/>
    <nav class="no-hyphens">
      <router-link to="about">about</router-link>
      <router-link to="privacy">privacy</router-link>
    </nav>
    <h1>New&nbsp;Normal<br>Neighbourhood</h1>
    <p class="no-hyphens">
      A toolkit for finding speculative responses to&nbsp;future crises
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
  padding: $spacing $spacing $spacing $spacing;
  display: flex;
  flex-direction: column;
  background: $color-accent;

  h1 {
    width: 100%;
    margin-bottom: $spacing;
  }
  .arrow {
    margin-top: auto;
  }
  p + p {
    margin-top: $spacing;
  }

  nav {
    margin-bottom: $spacing * 3;
    text-align: right;
    a {
      // font-size: 0.8em;
      opacity: 0.5;
      color: $color-accent-dark;
      // text-decoration: underline;
      &+a {
        margin-left: $spacing / 2;
      }
    }
  }
}
</style>
