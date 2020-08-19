<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home
      v-if="$page.frontmatter.home"
    />

    <main
      class="main"
      v-else
    >
      <DefaultGlobalLayout
        :sidebar-items="sidebarItems"
      />
    </main>
    <Footer />

    <component
      v-if="cookieLawComponent"
      :is="cookieLawComponent"
      theme="headless"
      @accept="addGoogleAnalytics()"
    >
      <div
        slot-scope="props"
        class="container"
      >
        <p>This website uses cookies to ensure you get the best experience on our website.</p>
        <div>
          <button
            class="accept"
            @click="props.accept"
          >
            <span>Accept</span>
          </button>
          <button
            class="decline"
            @click="props.decline"
          >
            <span>Decline</span>
          </button>
        </div>
      </div>
    </component>
  </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout.vue'
import Navbar from '@theme/components/Navbar.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import MobileHeader from '@theme/components/MobileHeader.vue'
import Footer from '@theme/components/Footer.vue'
import Home from '@theme/components/Home.vue'
import { resolveSidebarItems } from '../util'

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Navbar,
    Sidebar,
    MobileHeader,
    Footer,
    Home
  },

  data () {
    return {
      isSidebarOpen: false,
      cookieLawComponent: null
    }
  },

  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })

    // Load component dynamically because is not SSR supported
    import('vue-cookie-law').then(module => {
      this.cookieLawComponent = module.default
    })
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false ||
        themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    addGoogleAnalytics () {
      /* global ga */
      if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        (function (i, s, o, g, r, a, m) {
          i.GoogleAnalyticsObject = r
          i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
          }
          i[r].l = 1 * new Date()
          a = s.createElement(o)
          m = s.getElementsByTagName(o)[0]
          a.async = 1
          a.src = g
          m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

        ga('create', 'UA-110523681-5', 'auto')
        ga('set', 'anonymizeIp', true)

        this.$router.afterEach(function (to) {
          ga('set', 'page', to.fullPath)
          ga('send', 'pageview')
        })
      }
    }
  }
}
</script>

<style lang="stylus">
#vuepress-theme-blog__global-layout
  word-wrap break-word

.main
  padding-left $sidebarWidth
  // max-width $contentWidth
  min-height "calc(100vh - %s)" % ($footerHeight + $navbarHeight / 2)

.Cookie--headless
  background-color #F9FAFC
  padding 10px 30px
  .container
    display flex
    width 100%
    justify-content space-between
    align-items center
    font-size 14px
    button
      background-color $accentColor
      border 0
      color #fff
      padding 7px 15px
      font-size 14px
      font-weight bold
      border-radius 999px
      cursor pointer
      &.decline
        opacity .6
</style>
