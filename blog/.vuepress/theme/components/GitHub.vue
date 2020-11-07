<template>
  <a
    class="github"
    :href="'https://github.com/' + $site.themeConfig.docsRepo"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon
      name="logo-github"
      :width="60"
    />
  </a>
</template>

<script>
import Icon from './Icon.vue'

export default {
  components: { Icon }
}
</script>

<style lang="stylus">
.github
  display inline-table
  color: $blackLighter
  line-height: 1px !important

  &:hover
    color $accentColor
</style>
