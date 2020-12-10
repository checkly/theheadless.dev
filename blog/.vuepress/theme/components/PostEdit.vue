<template>
  <footer class="post-edit">
    <div
      class="last-updated"
      v-if="lastUpdated"
    >
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
    <div
      class="edit-link"
      v-if="editLink"
    >
      <a
        :href="editLink"
        target="_blank"
        rel="noopener noreferrer"
      >{{ editLinkText }}</a>
      <OutboundLink />
    </div>
  </footer>
</template>
<script>
import isNil from 'lodash/isNil'
import { endingSlashRE, outboundRE } from '../util'

export default {
  name: 'PostEdit',
  computed: {
    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },

    editLink () {
      const showEditLink = isNil(this.$page.frontmatter.editLink)
        ? this.$site.themeConfig.editLinks
        : this.$page.frontmatter.editLink

      const {
        repo,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      if (showEditLink && docsRepo && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        )
      }
      return null
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        'Edit this page'
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo
        return (
          base.replace(endingSlashRE, '') +
          '/src' +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`
      return (
        base.replace(endingSlashRE, '') +
        '/edit' +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, '') + '/' : '') +
        path
      )
    }
  }
}
</script>
<style lang="stylus">
.post-edit
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  .edit-link
    display inline-block
    a
      color #3C4858
      margin-right 0.25rem
      font-weight normal

  .last-updated
    float right
    color: #3C4858
    font-size 0.9em

@media (max-width: $MQMobile)
  .post-edit
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left

</style>
