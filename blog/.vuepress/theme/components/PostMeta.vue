<template>
  <div class="post-meta-wrapper">
    <div
      v-if="author"
      class="post-meta post-author"
      itemprop="publisher author"
      itemtype="http://schema.org/Person"
      itemscope
    >
      <UserIcon />
      <span itemprop="name">{{ author }}</span>
    </div>

    <div
      v-if="date"
      class="post-meta post-date"
    >
      <ClockIcon />
      <time
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >
        {{ resolvedDate }}
      </time>
    </div>

    <div
      v-if="tags"
      class="post-meta post-tag"
      itemprop="keywords"
    >
      <TagIcon />
      <router-link
        v-for="tag in tags"
        :key="tag"
        :to="'/tag/' + tag"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { UserIcon, ClockIcon, TagIcon } from 'vue-feather-icons'
import PostTag from './PostTag.vue'

export default {
  name: 'PostMeta',
  components: { UserIcon, ClockIcon, PostTag, TagIcon },
  props: {
    tags: {
      type: [Array, String]
    },
    author: {
      type: String
    },
    date: {
      type: String
    },
    location: {
      type: String
    }
  },
  computed: {
    resolvedDate () {
      return dayjs(this.date).format(
        this.$themeConfig.dateFormat || 'ddd MMM DD YYYY'
      )
    },
    resolvedTags () {
      if (!this.tags || Array.isArray(this.tags)) return this.tags
      return [this.tags]
    }
  }
}
</script>

<style lang="stylus">
  .post-meta-wrapper
    display block

  .post-meta
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
      display block

      &:not(:last-child)
        margin-bottom 10px

  .post-author
    color $gray
    font-weight 600

  .post-date
    color $gray
    font-weight 600

  .post-tag
    color $gray
    font-weight 600

    a
      color inherit
      font-weight 600
      text-decoration none
      margin-right 5px

      &:hover
        color $accentColor
</style>
