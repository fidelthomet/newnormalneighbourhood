<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted () {
    this.init()
  },
  methods: {
    ...mapActions('main', ['init'])
  }
}
</script>
