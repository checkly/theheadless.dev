<template>
  <section id="header-wrapper">
    <header id="navbar">
      <div class="navbar-wrapper">
        <div class="title">
          <NavLink link="/" class="home-link">{{ $site.title }} </NavLink>
        </div>
        <div class="navbar-right-wrap">
          <ul v-if="$themeConfig.nav" class="nav">
            <li
              v-for="item in $themeConfig.nav"
              :key="item.text"
              class="nav-item"
            >
              <NavLink :link="item.link">{{ item.text }}</NavLink>
            </li>
          </ul>
          <SearchBox />
          <Feed />
        </div>
      </div>
    </header>
  </section>
</template>

<script>
import SearchBox from '@SearchBox'
import Feed from './Feed'

export default {
  components: { SearchBox, Feed },
}
</script>

<style lang="stylus">
@import '~@app/style/config'

#navbar
  z-index 12
  position fixed
  top 0
  width 100vw
  height $headerHeight
  box-sizing border-box
  background-color $headerBgColor
  padding 20px 32px 20px
  margin auto

  ol, ul
    list-style none
    margin 0
    padding 0


.navbar-wrapper
  display flex
  line-height 40px
  height 40px

  .title
    /* flex 0 0 200px */
    font-size 16px
    margin 0
    letter-spacing 2px
    display block
    text-transform uppercase

    a
      color $darkTextColor
      font-weight bold
      text-decoration none

  .navbar-right-wrap
    flex 1
    display flex
    justify-content flex-end
    align-items center

    .nav
      flex 0 0 auto
      display flex
      margin 0

      .nav-item
        margin-left 20px

        a
          font-size 20px
          // color lighten(#3eaf7c, 30%)
          text-decoration none
          transition color 0.3s

    .search-box
      margin-left 20px

      input
        border-radius 3px
        transition all 0.5s
        border 1px solid $queenLight
        background-color $queenLightest
        color $blackLighter

      .suggestions
        border 1px solid $darkBorderColor
        top 40px
        right 0

        a
          color $darkTextColor
          text-decoration none

          &.focused
            color $accentColor

@media (max-width: $MQMobile)
  #navbar
    display none

  .navbar-wrapper
    flex-direction column

    .navbar-right-wrap
      display none
</style>
