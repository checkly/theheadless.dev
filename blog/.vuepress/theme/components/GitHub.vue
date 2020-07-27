<template>
  <a
    class="github"
    :href="'https://github.com/' + $site.themeConfig.docsRepo"
    target="_blank"
  >
    GitHub
  </a>
</template>

<script>

export default {
}
</script>

<style lang="stylus">
.github
  display flex
  align-items center
  color $blackLighter

  &:hover
    color $accentColor
</style>
