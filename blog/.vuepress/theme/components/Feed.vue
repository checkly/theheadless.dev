<template>
  <a
    v-if="getFirstEnabledFeed"
    class="feed"
    :href="getFirstEnabledFeed | getFeedFilePath"
  >
    RSS
  </a>
</template>

<script>

export default {
  filters: {
    getFeedFilePath (feed) {
      if (feed === 'rss') return '/rss.xml'
      if (feed === 'atom') return '/feed.atom'
      if (feed === 'json') return '/feed.json'
      return ''
    }
  },
  computed: {
    getFirstEnabledFeed () {
      for (const feed in this.$service.feed) {
        const isEnabled = this.$service.feed[feed]
        if (isEnabled) return feed
      }
      return false
    }
  }
}
</script>

<style lang="stylus">
.feed
  display flex
  align-items center
  color $blackLighter

  &:hover
    color $accentColor
</style>
