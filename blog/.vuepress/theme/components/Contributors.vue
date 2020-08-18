<template>
  <div class="contributors__wrap">
    <h3>Contributors</h3>
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
    &__wrap
      max-width none
      text-align center
    &__avatar
      border-radius 9999px
      width 30px
      margin-right .5rem
</style>
