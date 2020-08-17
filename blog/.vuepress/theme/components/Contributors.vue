<template>
  <div class="contributors__wrap">
    <h3>Contributors</h3>
    <a
      :href="contributor.url"
      target="_blank"
      v-for="contributor in contributors"
      :key="contributor.login"
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
  .contributors__wrap
    max-width none
    text-align center

  .contributors__avatar
    border-radius 9999px
    width 30px
    margin-right .5rem

@media (max-width: $MQMobile)
  .newsletter
    .newsletter &__fields
      display block

    .newsletter &__input
      margin-bottom 10px
</style>
