<template>
  <div class="about">
    <nav class="no-hyphens">
      <router-link :to="{name:'Home'}">home</router-link>
      <div class="spacer"/>
      <router-link to="about">background</router-link>
      <router-link to="privacy">privacy</router-link>
    </nav>
    <h2>Privacy</h2>
    <p>
      When you visit this website, the following information is stored on the server in log files: The IP address, the browser and operating system of the visitor, the time of the visit, the web pages called up and files requested and, if transmitted, which website referred to them.
    </p>
    <p>
      The recorded data is used for error detection and securing the server and is automatically deleted after 14 days. The data will not be transmitted to third parties. The website does not use cookies and does not embed content from external websites.
    </p>
    <p>
      When you submit a proposal, the following information is stored on the server: The photo you took, the geolocation of where you took the photo, the title and the description you provided and the illustration you created.
    </p>
    <p>
      This information is not associated with any personal information and is published on this website anonymously under the public domain.
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
}
</style>
