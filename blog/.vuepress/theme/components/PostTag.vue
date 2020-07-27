<template>
  <div
    class="post-tag"
    :style="'background:' + color"
  >
    <router-link :to="'/tag/' + tag">
      <span>{{ tag }}</span>
    </router-link>
  </div>
</template>

<script>
import ColorHash from 'color-hash'

export default {
  name: 'PostTag',
  props: {
    tag: {
      type: String,
      required: true
    }
  },
  computed: {
    color () {
      return new ColorHash({ lightness: 0.8 }).hex(this.tag)
    }
  }
}
</script>

<style scoped lang="stylus">
.post-tag
  padding 2px 6px
  border-radius 3px
  margin-right 5px
  &:not(:last-child)
    margin-right 5px

  a
    color $darkTextColor
    font-weight 500
    text-decoration none

    &:hover
      color $darkTextColor
      text-decoration none
</style>
