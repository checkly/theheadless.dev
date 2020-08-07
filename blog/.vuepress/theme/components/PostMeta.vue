<template>
  <div class="post-meta-wrapper">
    <div
      v-if="author"
      class="post-meta post-author"
      itemprop="publisher author"
      itemtype="http://schema.org/Person"
      itemscope
    >
      <img
        class="post-githubUser"
        :src="'https://github.com/' + this.githubUser + '.png?size=100'"
        :alt="this.githubUser"
        v-if="this.githubUser"
      >
      <UserIcon v-else />
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
      <PostTag
        v-for="tag in tags"
        :key="tag"
        :tag="tag"
      />
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
    },
    githubUser: {
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
    display flex
    align-items center
    flex-wrap wrap

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
    color $grayLight
    display flex
    align-items center

  .post-date
    color $grayLight

  .post-githubUser
    border-radius 9999px
    width 30px
    margin-right .5rem
</style>
