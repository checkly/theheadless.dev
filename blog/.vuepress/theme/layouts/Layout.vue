<template>
  <div class="list">
    <div
      class="ui-posts"
      itemscope
      itemtype="http://schema.org/Blog"
    >
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

        <div class="ui-post-meta-wrapper">
          <div
            v-if="page.frontmatter.author"
            class="ui-post-meta ui-post-author"
            itemprop="publisher author"
            itemtype="http://schema.org/Person"
            itemscope
          >
            <img
              class="ui-post-githubUser"
              :src="'https://github.com/' + page.frontmatter.githubUser + '.png?size=100'"
              :alt="page.frontmatter.githubUser"
              v-if="page.frontmatter.githubUser"
            >
            <UserIcon v-else />
            <span itemprop="name">{{ page.frontmatter.author }}</span>
            <span
              v-if="page.frontmatter.location"
              itemprop="address"
            >
              &nbsp; in {{ page.frontmatter.location }}
            </span>
          </div>

          <div
            v-if="page.frontmatter.date"
            class="ui-post-meta ui-post-date"
          >
            <ClockIcon />
            <time
              pubdate
              itemprop="datePublished"
              :datetime="page.frontmatter.date"
            >
              {{ resolvePostDate(page.frontmatter.date) }}
            </time>
          </div>

          <div
            v-if="page.frontmatter.tags"
            class="ui-post-meta ui-post-tag"
            itemprop="keywords"
          >
            <TagIcon />
            <router-link
              v-for="tag in resolvePostTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </div>

        <!-- eslint-disable vue/no-v-html -->
        <p
          v-if="page.excerpt"
          class="ui-post-summary"
          itemprop="description"
          v-html="page.excerpt"
        />
        <!-- eslint-enable vue/no-v-html -->
        <p
          v-else
          class="ui-post-summary"
          itemprop="description"
        >
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <NavLink
          :link="page.path"
          class="ui-post-continue-link"
        >
          Continue reading
          <ArrowRightIcon />
        </NavLink>
      </article>
    </div>

    <component
      :is="paginationComponent"
      v-if="$pagination.length > 1 && paginationComponent"
    />
  </div>
</template>

<script>
/* global THEME_BLOG_PAGINATION_COMPONENT */

import Vue from 'vue'
import dayjs from 'dayjs'
import { UserIcon, ClockIcon, TagIcon, ArrowRightIcon } from 'vue-feather-icons'
import {
  Pagination,
  SimplePagination
} from '@vuepress/plugin-blog/lib/client/components'

export default {
  components: { UserIcon, ClockIcon, TagIcon, ArrowRightIcon },

  props: ['sidebarItems'],

  data () {
    return {
      paginationComponent: null
    }
  },

  computed: {
    pages () {
      return this.$pagination.pages
    }
  },

  created () {
    this.paginationComponent = this.getPaginationComponent()
  },

  methods: {
    getPaginationComponent () {
      const n = THEME_BLOG_PAGINATION_COMPONENT
      if (n === 'Pagination') {
        return Pagination
      }

      if (n === 'SimplePagination') {
        return SimplePagination
      }

      return Vue.component(n) || Pagination
    },

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
    padding-top $navbarHeight + 2rem
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
    padding-bottom 16px
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
    color $blue
    font-weight bold
    text-decoration none

    svg
      margin-left 2px
      width 16px
      height 16px

  .ui-post-meta-wrapper
    display flex
    align-items center
    flex-wrap wrap

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
    color $gray
    font-weight 600

  .ui-post-date
    color $gray
    font-weight 600

  .ui-post-tag
    color $gray
    font-weight 600

    a
      color inherit
      font-weight 600
      text-decoration none
      margin-right 5px

      &:hover
        color $accentColor
  .ui-post-githubUser
    border-radius 9999px
    width 25px
    margin-right .5rem
</style>
