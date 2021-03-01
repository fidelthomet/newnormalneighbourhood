<template>
  <div class="about">
    <nav class="no-hyphens">
      <router-link :to="{name:'Home'}">home</router-link>
      <div class="spacer"/>
      <router-link to="about">about</router-link> <router-link to="privacy">privacy</router-link>
    </nav>
    <h2>About</h2>
    todo
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/global";
.about {
  background: $color-accent;
  padding: $spacing;
  min-height: 100vh;

  nav {
    margin-bottom: $spacing * 3;
    text-align: right;
    display: flex;

    .spacer {
      flex: 1;
    }

    a {
      opacity: 0.5;
      color: $color-accent-dark;

      &+a {
        margin-left: $spacing / 2;
      }
    }
  }

  h2 {
    margin-block-end: $spacing;
  }
}
</style>
