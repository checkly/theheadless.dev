<template>
  <footer class="footer">
    <div class="footer-left-wrap">
      <ul
        v-if="contact"
        class="contact"
      >
        <li
          v-for="item in contact"
          :key="item.link"
          class="contact-item"
        >
          <NavLink :link="item.link">
            {{ item.text }}
          </NavLink>
        </li>
      </ul>
    </div>

    <div class="footer-right-wrap">
      <ul
        v-if="copyright"
        class="copyright"
      >
        <li
          v-for="item in copyright"
          :key="item.text"
          class="copyright-item"
        >
          <NavLink :link="item.link">
            {{ item.text }}
          </NavLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>

export default {
  computed: {
    contact () {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.contact) ||
        []
      )
        .map(({ type, link }) => {
          return {
            link
          }
        })
        .filter(({ iconComponent }) => iconComponent)
    },

    copyright () {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
ol, ul
  list-style none
  margin 0
  padding 0

.footer
  min-height $footerHeight
  box-sizing border-box
  background-color $footerBgColor
  display flex
  padding 2rem 2rem
  flex-shrink: 0;

  .footer-left-wrap
    line-height 30px
    flex 1
    display flex

    .contact
      display flex
      flex-wrap wrap
      justify-content center

      .contact-item
        margin-right 10px

        a
          font-size 12px
          color $footerColor
          text-decoration none
          transition color 0.3s

          &:hover
            color #FFF

  .footer-right-wrap
    flex 1
    display flex
    align-items center
    justify-content center

    @media (min-width: $MQNarrow)
      justify-content flex-end

    .copyright
      display flex
      justify-content flex-end

      .copyright-item
        flex 0 0 auto
        padding 0 10px
        position relative
        line-height 12px
        border-right 1px solid $footerColor

        &:last-child
          border-right none

        a
          font-size 12px
          color $gray
          text-decoration none

@media (max-width: $MQMobile)
  .footer
    min-height 100px
    flex-direction column

    .footer-left-wrap
      align-items center
      justify-content center

    .footer-right-wrap
      .copyright
        display block

        .copyright-item
          line-height 1
          border-right none
          text-align center
</style>
