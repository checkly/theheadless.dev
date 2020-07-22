<template>
  <a
    class="github"
    :href="'https://github.com/' + $site.themeConfig.docsRepo"
    target="_blank"
  >
    <GithubIcon size="22" />
  </a>
</template>

<script>
import { GithubIcon } from 'vue-feather-icons'

export default {
  components: { GithubIcon }
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
