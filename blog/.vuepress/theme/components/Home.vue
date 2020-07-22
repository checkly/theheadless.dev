<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <header class="hero">
      <h1
        id="main-title"
      >
        👩‍💻 Learn Puppeteer & Playwright
      </h1>

      <p class="description">
        {{ data.tagline || $description }}
      </p>

      <p
        class="action"
        v-if="data.actionText && data.actionLink"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </header>

    <div class="recent-activity">
      <h2>Recent activity</h2>
      <ul>
        <li
          v-for="page in recentPosts"
          :key="page.path"
        >
          <router-link :to="page.path">
            {{ page.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div>
  </main>
</template>

<script>
import NavLink from './NavLink.vue'
export default {
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },

    recentPosts () {
      const posts = this.$site.pages
        .filter(page => {
          return page.id === 'post'
        })
      return posts.slice(0, 10)
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $contentWidth
  min-height "calc(100vh - %s)" % ($footerHeight + $navbarHeight + 2rem)
  margin 0 auto
  display block
  .hero
    text-align left
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem 0
    .description
      max-width $contentWidth
      font-size 1.6rem
      line-height 1.3
      color $darkTextColor
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)

  .recent-activity
    h2
      padding-top 1rem
    ul
      list-style none
      padding-left 0
      li
        margin-bottom .25rem
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
</style>
