<template>
  <div class="list">
    <div
      class="ui-posts"
      itemscope
      itemtype="http://schema.org/Blog"
    >
      <div
        v-if="isTagsListPage"
        class="ui-posts-count-summary"
      >
        <div class="ui-posts-count-summary-number">
          {{ $currentTag.pages.length }}
        </div>
        posts in
        <div class="ui-posts-count-summary-tag">
          {{ $currentTag.key }}
        </div>
      </div>
      <article
        v-for="page in pages"
        :key="page.key"
        class="ui-post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="page.path"
        >

        <header
          class="ui-post-title"
          itemprop="name headline"
        >
          <NavLink :link="page.path">
            {{ page.title }}
          </NavLink>
        </header>

        <!-- eslint-disable vue/no-v-html -->
        <client-only v-if="page.excerpt">
          <p
            class="ui-post-summary"
            itemprop="description"
            v-html="page.excerpt"
          />
        </client-only>
        <!-- eslint-enable vue/no-v-html -->
        <p
          v-else
          class="ui-post-summary"
          itemprop="description"
        >
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <div class="ui-post-meta-wrapper">
          <PostMeta
            :tags="page.frontmatter.tags"
            :author="page.frontmatter.author"
            :date="page.frontmatter.date"
            :location="page.frontmatter.location"
            :github-user="page.frontmatter.githubUser"
          />

          <NavLink
            :link="page.path"
            class="ui-post-continue-link"
          >
            Continue reading
            <ArrowRightIcon />
          </NavLink>
        </div>
      </article>
    </div>

    <Pagination
      v-if="$pagination.length > 1"
    />
  </div>
</template>

<script>

import dayjs from 'dayjs'
import { UserIcon, ClockIcon, TagIcon, ArrowRightIcon } from 'vue-feather-icons'
import {
  Pagination
} from '@vuepress/plugin-blog/lib/client/components'
import PostTag from '../components/PostTag'
import PostMeta from '../components/PostMeta'

export default {
  components: { UserIcon, ClockIcon, TagIcon, ArrowRightIcon, Pagination, PostTag, PostMeta },

  props: ['sidebarItems'],

  data () {
    return {
      paginationComponent: null
    }
  },

  computed: {
    pages () {
      return this.$pagination.pages
    },

    isTagsListPage () {
      return this.$currentTag
    }
  },

  methods: {
    resolvePostDate (date) {
      return dayjs(date).format(
        this.$themeConfig.dateFormat || 'ddd MMM DD YYYY'
      )
    },

    resolvePostTags (tags) {
      if (!tags || Array.isArray(tags)) return tags
      return [tags]
    }
  }
}
</script>

<style lang="stylus">
  @require '../styles/wrapper.styl'
  .list
    @extend $wrapper
    padding-top $navbarHeight + 5rem
  .ui-posts-count-summary
    margin-bottom 25px
    color $gray
    font-size 22px
    display flex
    flex-direction row
    .ui-posts-count-summary-number
      color $darkTextColor
      margin-right 5px
    .ui-posts-count-summary-tag
      color $darkTextColor
      margin-left 5px

  .ui-post
    padding-bottom 25px
    margin-bottom 25px
    border-bottom 1px solid $borderColor

    &:last-child
      border-bottom 0px
      margin-bottom 0px

  .ui-post-title
    font-size 32px
    border-bottom 0
    a
      cursor pointer
      color $darkTextColor
      transition all 0.2s
      text-decoration none
      font-weight bold
      line-height 39px
      vertical-align top

      &:hover
        text-decoration underline

  .ui-post-summary
    font-size 16px
    font-style normal
    line-height 27px
    color $darkTextColor
    font-weight normal

  .ui-post-continue-link
    display inline-flex
    align-items center
    font-size 16px
    font-style normal
    line-height 16px
    color $accentColor
    text-decoration none
    font-weight bold

    svg
      margin-left 2px
      width 16px
      height 16px

  .ui-post-meta-wrapper
    display flex
    align-items center
    flex-wrap wrap
    justify-content: space-between
    margin: 30px 0

  .ui-post-meta-wrapper-meta
    display: flex

  .ui-post-meta
    display inline-flex
    align-items center
    font-size 14px
    line-height 14px

    &:not(:last-child)
      margin-bottom 3px
      margin-right 20px

    svg
      margin-right 5px
      width 14px
      height 14px

    @media (max-width: $MQMobile)
      display flex

      &:not(:last-child)
        margin-bottom 10px

  .ui-post-author
    color $grayLight
    display flex
    align-items center

  .ui-post-date
    color $grayLight

  .ui-post-githubUser
    border-radius 9999px
    width 25px
    margin-right .5rem

@media (max-width: $MQMobile)
  .ui-post-meta-wrapper-meta
    flex-wrap wrap
  .ui-post-tag
    margin 5px 0 15px
</style>
