<template>
  <div class="blog-tags">
    <BlogTag
      v-for="tag in tags"
      :key="tag.name"
      :tag="tag"
    />
  </div>
</template>

<script>
export default {
  props: ['tags']
}
</script>

<style lang="scss">
</style>
