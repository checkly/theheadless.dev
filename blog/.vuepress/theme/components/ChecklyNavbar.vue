<template>
  <div
    class="checkly-navbar"
    :class="{'checkly-navbar--sticky': !$page.frontmatter.home}"
  >
    <a
      href="https://checklyhq.com/?utm_source=headless-dev&utm_campaign=headless-dev"
      target="_blank"
      rel="noopener"
      class="checkly-navbar__logo"
    >
      <img
        src="/checkly.svg"
        width="120"
        alt="Checkly logo"
        class="desktop"
      >

      <img
        src="/racoon_favicon.png"
        alt="Checkly logo"
        class="mobile"
        width="34"
      >
    </a>

    <div class="checkly-navbar__link">
      <a
        href="https://checklyhq.com/?utm_source=headless-dev&utm_campaign=headless-dev"
        target="_blank"
        rel="noopener"
      >
        👉
        <span class="desktop">Run Puppeteer & Playwright for global monitoring</span>
        <span class="mobile">Run Puppeteer & Playwright</span>

        <Icon
          name="arrow-right"
          class="checkly-navbar__link--icon"
        />
      </a>
    </div>
  </div>
</template>
<script>
import Icon from './Icon'

export default {
  name: 'ChecklyNavbar',
  components: { Icon }
}
</script>
<style lang="scss" scoped>
.checkly-navbar {
  background-color: #F9FAFC;
  width: 100%;
  display: flex;
  height: 55px;
  padding: 0 20px;
  justify-content: space-between;
  box-sizing: border-box;

  &--sticky {
    position: fixed;
    z-index: 1000;
  }

  .mobile {
    display: none;
  }

  &__logo {
    margin-top: 12px;
  }

  &__link {
    margin-top: 15px;
    font-size: 14px;
    color: #1F2D3D;

    a {
      color: #1F2D3D;
      display: flex;
    }

    span {
      border-bottom: 4px solid #E0E6ED;
      margin-left: 5px;
      transition: border-bottom .25s;

      &:hover {
        border-bottom: 4px solid #ff4949;
      }
    }

    &--icon {
      margin: 5px 0 0 15px;
    }
  }
}

@media (max-width: 414px) {
  .checkly-navbar {
    .mobile {
      display: block;
    }

    .desktop {
      display: none;
    }
  }
}
</style>
