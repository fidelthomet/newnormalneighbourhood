<template>
  <div class="contribute-chat">
    <transition name="fade-alt">
      <base-button v-if="skip" class="skip" @click="$emit('next')" icon="next">Skip</base-button>
    </transition>
    <div class="messages">
      <template v-for="(m, i) in messages" :key="i">
        <contribute-chat-message :msg="m[1]" :user="m[0]"/>
      </template>
      <template v-for="(m, i) in challenge.chat.filter((m, i) => i === progress)" :key="i">
        <div v-if="m[0]" class="options">
          <contribute-chat-message v-for="(m2, i2) in m.filter((m2, i2) => i2 !== 0)" :key="i2" :msg="m2[0]" icon="next" user @click="input(m2)"/>
        </div>
        <contribute-chat-message v-else typing/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from './BaseButton.vue'
import ContributeChatMessage from './ContributeChatMessage.vue'
// import BaseImage from './BaseImage.vue'
export default {
  components: { ContributeChatMessage, BaseButton },
  name: 'contribute-chat',
  props: {
    challenge: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      skip: true,
      progress: 0,
      timeout: null,
      messages: [],
      responses: []
    }
  },
  computed: {
    ...mapGetters('device', ['statusLocation', 'statusCamera', 'permissionsGranted'])
  },
  mounted () {
    this.type()
  },
  beforeUnmount () {
    clearTimeout(this.timeout)
  },
  methods: {
    type () {
      window.setTimeout(() => {
        this.messages.push(this.challenge.chat[this.progress])
        if (this.challenge.chat[this.progress][2] === -1) {
          this.$emit('next')
          return
        }
        this.progress += 1 + (this.challenge.chat[this.progress][2] || 0)
        if (!this.challenge.chat[this.progress][0]) {
          this.type()
        }
      }, Math.max(this.challenge.chat[this.progress][1].length * 25, 1500))
    },
    input (message) {
      this.skip = false
      if (message[1] === -1) {
        this.$emit('next')
        return
      }
      this.messages.push([true, message[0]])
      this.progress += 1 + (message[1] || 0)
      if (!this.challenge.chat[this.progress][0]) {
        this.type()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-chat {
  height: 100%;
  position: relative;
  // padding: $spacing * 8 $spacing $spacing $spacing;
  display: flex;
  // flex-direction: column;
  align-items: flex-end;
  justify-items: flex-end;
  // background: $color-black;
  padding: $page-padding;
  .skip {
    position: absolute;
    top: $spacing * 2;
    right: $spacing;
  }

  .messages {
    display: flex;
    width: 100%;
    flex-direction: column;

    max-width: $extra-narrow;

    .options {
      display: flex;
      align-items: flex-end;
      flex-wrap: wrap;
      justify-content: flex-end;
      span + span {
        margin-left: $spacing / 2;
      }
    }
  }
}
</style>
