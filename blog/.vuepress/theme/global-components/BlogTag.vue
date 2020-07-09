<template>
  <router-link
    class="blog-tag"
    :to="tag.path"
  >
    {{ tag.name }} ({{ tag.pages.length }})
  </router-link>
</template>

<script>
export default {
  props: ['tag']
}
</script>

<style lang="scss">

</style>
