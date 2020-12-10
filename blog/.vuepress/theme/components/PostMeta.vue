<template>
  <div class="post-meta-wrapper">
    <div
      v-if="author && Array.isArray(author)"
      class="post-meta post-author"
    >
      <div
        v-if="contributors"
        itemprop="publisher author"
        itemtype="http://schema.org/Person"
        itemscope
      >
        <img
          v-for="contributor in contributors"
          :key="contributor.name"
          class="post-githubUser"
          :src="'https://github.com/' + contributor.image + '.png?size=100'"
          :alt="contributor.name"
          v-tooltip="{ content: contributor.name, classes: 'tooltip', placement: 'top' }"
        >
      </div>
    </div>
    <div
      v-else
      class="post-meta post-author"
      itemprop="publisher author"
      itemtype="http://schema.org/Person"
      itemscope
    >
      <img
        class="post-githubUser single"
        :src="'https://github.com/' + githubUser + '.png?size=100'"
        :alt="githubUser"
      >
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
import Vue from 'vue'
import { VTooltip } from 'v-tooltip'
import dayjs from 'dayjs'
import { UserIcon, ClockIcon, TagIcon } from 'vue-feather-icons'
import PostTag from './PostTag.vue'

Vue.directive('tooltip', VTooltip)

export default {
  name: 'PostMeta',
  components: { UserIcon, ClockIcon, PostTag, TagIcon },
  props: {
    tags: {
      type: [Array, String]
    },
    author: {
      type: [Array, String]
    },
    date: {
      type: String
    },
    location: {
      type: String
    },
    githubUser: {
      type: [Array, String]
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
    },
    contributors () {
      return this.author.map((author, index) => ({
        image: this.githubUser[index] || '',
        name: author
      }))
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
    color #3C4858
    display flex
    align-items center

  .post-date,
  .post-tag
    color #3C4858

  .post-githubUser
    border-radius 9999px
    width 30px
    margin-left -8px
    border 2px solid #fff
    box-sizing border-box
    position relative
    &.single {
      margin-right 5px
    }
    &:hover:not(.single) {
      border-color $accentColor
    }
    &:first-child
      margin-left 0
      z-index 3

@media (max-width: $MQMobile)
  .post-tag
    display flex

.tooltip
  border 2px solid $accentColor
  border-radius 5px
  padding 3px 6px
  background-color #fff
  font-size 14px
  margin-bottom 3px

.tooltip-arrow
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: $accentColor;
  z-index: 1;

.tooltip[x-placement^="top"]
  margin-bottom: 5px;

.tooltip[x-placement^="top"] .tooltip-arrow
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
</style>
