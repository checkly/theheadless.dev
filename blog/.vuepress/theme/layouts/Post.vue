<template>
  <div class="post">
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
      class="post-article"
    >
      <header>
        <h1
          class="post-title"
          itemprop="name headline"
        >
          {{ $frontmatter.title }}
        </h1>
        <PostMeta
          :tags="$frontmatter.tags"
          :author="$frontmatter.author"
          :date="$frontmatter.date"
          :location="$frontmatter.location"
          :github-user="$frontmatter.githubUser"
        />
      </header>
      <Content itemprop="articleBody" />
      <social-share />
      <footer>
        <Newsletter v-if="$service.email.enabled" />
        <PostEdit />
        <!--        <PostNav v-bind="{ sidebarItems }" />-->
      </footer>
    </article>
    <Toc />
  </div>
</template>

<script>
import Toc from '@theme/components/Toc.vue'
import PostMeta from '@theme/components/PostMeta.vue'
import PostEdit from '@theme/components/PostEdit.vue'
import PostNav from '@theme/components/PostNav.vue'

export default {
  components: {
    Toc,
    PostMeta,
    PostEdit,
    PostNav,
    Newsletter: () => import('@theme/components/Newsletter.vue')
  },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.post
  display flex

.post-article
  @extend $wrapper
  padding-top $navbarHeight + 2rem
  font-size 16px
  letter-spacing 0
  color $textColor
  max-width 730px

  li {
    margin 12px 0
  }

@media (max-width: $MQMobile)
  .post-title
    margin-top 0
  .post
    display block
</style>
