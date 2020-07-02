<template>
  <li class="post-tag">
    <router-link :to="'/tag/' + tag">
      <span>{{ tag }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">
.post-tag

  &:not(:last-child)
    margin-right 5px

  a
    color $gray
    font-weight 600
    font-size 14px
    line-height 14px
    text-decoration none

    &:hover
      text-decoration underline
</style>
