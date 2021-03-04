<template>
  <div class="about">
    <nav class="no-hyphens">
      <router-link :to="{name:'Home'}">home</router-link>
      <div class="spacer"/>
      <router-link to="about">about</router-link> <router-link to="privacy">privacy</router-link>
    </nav>
    <h2>About</h2>
    <p>
      New Normal Neighbourhood is a thesis project by Fidel Thomet in the Urban Futures masters programme at the University of Applied Sciences Potsdam.
    </p>
    <p>
      The thesis explores using the notion of the New Normal for situated speculations on future crises. The website allows visitors to make proposals for crisis-responses for their own neighbourhoods. And to add them to a growing collection of speculations, which is under the public domain and can be shared, reused, and remixed in any way.
    </p>
    <p>
      If you have any questions or feedback, please reach out on Twitter: <a href="https://twitter.com/fidelthomet" rel="noreferrer">@fidelthomet</a> or per Mail: <a href="mailto:nnn@ft0.ch">nnn@ft0.ch</a>
    </p>
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/style/global";
.about {
  background: $color-accent;
  padding: $spacing;
  padding-bottom: $spacing * 8;
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

  p + p {
    margin-top: $spacing;
  }

  p {
    a {
      hyphens: none;
      color: inherit;
      text-decoration: underline;
    }
  }
}
</style>
