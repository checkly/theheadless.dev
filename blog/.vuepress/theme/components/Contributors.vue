<template>
  <div class="contributors">
    <div class="contributors__wrap">
      <h3>Headless Contributors</h3>
      <a
        v-for="contributor in contributors"
        :key="contributor.login"
        :href="contributor.html_url"
        target="_blank"
      >
        <img
          class="contributors__avatar"
          :src="'https://github.com/' + contributor.login + '.png?size=100'"
          :alt="contributor.login"
          v-if="contributor"
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contributors: []
    }
  },
  async mounted () {
    const res = await fetch('https://api.github.com/repos/checkly/theheadless.dev/contributors')
    this.contributors = await res.json()
  }
}
</script>

<style lang="stylus">
  .contributors
    background-color #F9FAFC
    padding 50px 0
    &__wrap
      max-width 620px
      border 7px solid #E0E6ED
      box-sizing border-box
      border-radius 15px
      text-align center
      margin 0 auto
      padding 40px 0
      background-color #fff
      h3
        margin 0 0 30px 0 !important
        padding 0 !important
        font-size 24px
    &__avatar
      border-radius 9999px
      width 45px
      margin-right 10px
</style>
