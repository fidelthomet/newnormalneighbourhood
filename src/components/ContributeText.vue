<template>
  <div class="contribute-text">
    <div class="nav">
      <!-- <base-button icon="type">
        Describe
      </base-button> -->
      <!-- <transition name="fade-alt">
        <base-button icon="next" icon-light v-if="valid" @click="$emit('next')"/>
      </transition> -->
    </div>
    <div class="form">
      <div class="label">
        <span>Aim</span>
        <span class="counter" :class="{warn: title.length > 40}">{{title.length}}/40</span>
      </div>
      <h2 :class="{warn: title.length > 40}" ref="title" contenteditable placeholder="What do you want to achieve?" @input="input('title', $event)"/>
      <div class="label">
        <span>Proposal</span>
        <span class="counter" :class="{warn: description.length > 160}">{{description.length}}/160</span>
      </div>
      <p :class="{warn: description.length > 160}" ref="description" contenteditable placeholder="How are you going to achieve that? What will need to change?" @input="input('description', $event)"/>
      <!-- <div class="label">
        <span>Proposal</span>
        <span class="counter" :class="{warn: title.length > 100}">{{description.length}}/100</span>
      </div>
      <p :class="{warn: description.length > 100}" ref="description" contenteditable placeholder="What needs to change? What can we do to increase resilience?" @input="input('description', $event)"/> -->
      <!-- <div class="label">
        <span>Opportunity</span>
        <span class="counter" :class="{warn: title.length > 100}">{{opportunity.length}}/100</span>
      </div>
      <p contenteditable placeholder="What can be done to adapt and mitigate risks?" @input="input('opportunity', $event)"/> -->
    </div>
    <div class="bottom-nav">
      <base-button icon="next" :disabled="!valid" @click="$emit('next')">Next</base-button>
    </div>
  </div>
</template>

<script>
import mapStateReactive from '@/assets/js/mapStateReactive'
import BaseButton from './BaseButton.vue'
// import BaseImage from './BaseImage.vue'
export default {
  components: { BaseButton },
  name: 'contribute-text',
  props: {
    challenge: {
      type: Object,
      default () { return {} }
    }
  },
  data () {
    return {
      // title: '',
      // vulnerability: '',
      // opportunity: ''
    }
  },
  computed: {
    valid () {
      const { title, description } = this
      return title.length > 0 && title.length <= 25 && description.length > 0 && description.length <= 150 // && opportunity.length > 0 && opportunity.length <= 150
    },
    ...mapStateReactive('data', ['title', 'description'])
  },
  methods: {
    input (attr, event) {
      if (event.target.innerHTML.trim() === '<br>') event.target.innerHTML = ''
      // if (event.target.innerText.length > )
      this[attr] = event.target.innerText
    }
  },
  mounted () {
    this.$refs.title.innerHTML = this.title
    this.$refs.description.innerHTML = this.description
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.contribute-text {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // align-items: flex-start;
  padding: $page-padding;
  position: relative;

  .nav {
    display: flex;
    justify-content: space-between;
    // position: fixed;
    left: 0;
    // width: 100%;
    // padding: 0 $spacing 0 $spacing;
  }

  .bottom-nav {
    display: flex;
    justify-content: flex-end;
  }

  .form {
    margin-top: $spacing * 4;
    margin-bottom: $spacing * 2;

    h2, p {
      outline: none;
      margin: $spacing / 2 0 $spacing * 2;
      transition: color $transition;

      &.warn {
        color: darken($color-accent, 35);
      }
    }

    .label {
      display: flex;
      justify-content: space-between;
      // vertical-align: baseline;
      align-items: center;
      .counter {
        // text-align: right;
        font-size: 0.7em;
        transition: color $transition;
        &.warn {
          color: darken($color-accent, 35);
        }
      }
    }

    [contenteditable][placeholder]:empty:before {
      content: attr(placeholder);
      opacity: 0.6;
    }
  }
}
</style>
