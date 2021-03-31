<template>
  <div class="home-intro">
    <div class="bg"/>
    <nav class="no-hyphens">
      <router-link to="about">background</router-link>
      <router-link to="privacy">privacy</router-link>
    </nav>
    <h1>New&nbsp;Normal<br>Neighbourhood</h1>
    <p class="no-hyphens">
      A place to propose local responses for&nbsp;times of permanent crisis
    </p>

    <p class="no-hyphens smaller">
      This site is part of a research project on using situated speculative design to explore new normals of future crises at the neighbourhood level
      <router-link to="about">→&nbsp;learn&nbsp;more</router-link>
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

  p.smaller {
    a {
      color: $color-accent-dark;
    }
  }

  p {
    a {
      hyphens: none;
      color: inherit;
      // text-decoration: underline;
    }
  }

  nav {
    margin-bottom: $spacing * 3;
    text-align: right;
    a {
      // font-size: 0.8em;
      color: $color-accent-dark;
      // text-decoration: underline;
      &+a {
        margin-left: $spacing / 2;
      }
    }
  }
}
</style>
