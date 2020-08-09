<template>
  <a
    v-if="getFirstEnabledFeed"
    class="feed"
    :href="getFirstEnabledFeed | getFeedFilePath"
  >
    <Icon
      name="rss"
      :width="20"
    />
  </a>
</template>

<script>
import Icon from './Icon.vue'

export default {
  components: { Icon },
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
  display: inline-table
  color: $blackLighter
  line-height: 1px !important

  &:hover
    color $accentColor
</style>
