<template>
  <header
    class="navbar"
    :class="{ 'home': isHomePage, 'stick': !isHomePage }"
  >
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link
      :to="$localePath"
      class="home-link"
    >
      <img
        class="logo"
        v-if="$site.themeConfig.logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <div
        ref="siteName"
        class="site-name"
        v-if="$siteTitle"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >
        theheadless.dev
      </div>
    </router-link>

    <div class="links">
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <NavLinks class="can-hide" />
      <GitHub class="icon-link can-hide" />
      <Feed class="icon-link can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from './AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from './SidebarButton.vue'
import NavLinks from './NavLinks.vue'
import Feed from './Feed.vue'
import GitHub from './GitHub.vue'

export default {
  components: { SidebarButton, NavLinks, AlgoliaSearchBox, SearchBox, Feed, GitHub },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    },

    isHomePage () {
      return this.$route.path === '/'
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem
$navbar-horizontal-padding = 1.5rem

.site-name
  background linear-gradient(260deg, rgba(255,0,0,1) 0%, rgba(255,97,154,1) 100%)
  background-clip text
  -webkit-background-clip text
  -webkit-text-fill-color transparent

.navbar
  padding: 10px
  &.home
    padding: 0
    max-width: 1150px
    margin: 40px auto 0
  &.stick
    position: fixed
    top: 55px
    background-color: #fff
    width: 100%
    z-index 1000
    .home-link
      padding-left: 13px
    &:before
      content: ''
      position: absolute
      width: $sidebarWidth
      background-color: #F9FAFC
      height: 100%
      top: 0
      left: 0
  line-height $navbarHeight - 1.4rem
  a, span, img
    display flex
    align-items center
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 600
    color $textColor
    position relative
  .links
    display: flex;
    align-items: center;
    .search-box
      flex: 0 0 auto
      vertical-align top
      padding-right 1rem
      input
        background-color #fff
        border-radius 100px
        border: 2px solid #8492A6
    .icon-link
      margin-left 1.5rem

@media (max-width: $MQMobile)
  .navbar
    margin: 0px !important
    max-width: 100%
    padding-left 4rem !important
    &.stick
      &:before
        background-color: #FFF
    .can-hide
      display none
    .links
      padding-left 1.5rem
      .search-box
        input
          background-color transparent

    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

</style>
