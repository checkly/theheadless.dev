<template>
  <footer
    class="footer"
    :class="{'large-margin': isHomePage}"
  >
    <div class="footer__container">
      <div class="footer__behind">
        Who's running this?
      </div>
      <div class="footer__text">
        We are the folks behind <a
          href="https://checklyhq.com/?utm_source=headless-dev&utm_campaign=headless-dev"
          target="_blank"
          rel="noopener"
        ><img
          src="/checkly.svg"
          width="80"
          alt="Checkly logo"
        ></a> and <a
          class="recorder"
          href="https://github.com/checkly/headless-recorder"
          target="_blank"
          rel="noopener noreferrer"
        >Headless Recorder</a>. We do API monitoring and synthetic monitoring using Puppeteer and Playwright. We see A LOT of headless browser workloads so we thought we’d share some of our learnings with the community.<br>
        Feel to contribute <a
          class="github"
          :href="'https://github.com/' + $site.themeConfig.docsRepo"
          target="_blank"
          rel="noopener noreferrer"
        >by just creating PR on GitHub!</a>

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
    </div>
  </footer>
</template>

<script>
import {
  CodepenIcon,
  CodesandboxIcon,
  FacebookIcon,
  GithubIcon,
  GitlabIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MessageSquareIcon,
  MusicIcon,
  PhoneIcon,
  TwitterIcon,
  VideoIcon,
  YoutubeIcon
} from 'vue-feather-icons'

export default {
  components: {
    CodepenIcon,
    CodesandboxIcon,
    FacebookIcon,
    GithubIcon,
    GitlabIcon,
    GlobeIcon,
    InstagramIcon,
    LinkedinIcon,
    MailIcon,
    MessageSquareIcon,
    MusicIcon,
    PhoneIcon,
    TwitterIcon,
    VideoIcon,
    YoutubeIcon
  },

  computed: {
    contact () {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.contact) ||
        []
      )
        .map(({ type, link }) => {
          return {
            iconComponent: this.getIconComponentName(type),
            link
          }
        })
        .filter(({ iconComponent }) => iconComponent)
    },

    copyright () {
      return (
        (this.$themeConfig.footer && this.$themeConfig.footer.copyright) || []
      )
    },

    isHomePage () {
      return this.$route.path === '/'
    }
  },

  methods: {
    getIconComponentName (contactType) {
      switch (contactType) {
        case 'codepen':
          return 'CodepenIcon'
        case 'codesandbox':
          return 'CodesandboxIcon'
        case 'facebook':
          return 'FacebookIcon'
        case 'github':
          return 'GithubIcon'
        case 'gitlab':
          return 'GitlabIcon'
        case 'instagram':
          return 'InstagramIcon'
        case 'linkedin':
          return 'LinkedinIcon'
        case 'mail':
          return 'MailIcon'
        case 'messenger':
          return 'MessageSquareIcon'
        case 'music':
          return 'MusicIcon'
        case 'phone':
          return 'PhoneIcon'
        case 'twitter':
          return 'TwitterIcon'
        case 'video':
          return 'VideoIcon'
        case 'web':
          return 'GlobeIcon'
        case 'youtube':
          return 'YoutubeIcon'
        default:
          return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  background: #F9FAFC;
  padding: 50px 0;
  margin-top: 150px;
  position: relative;
  z-index: 10;
  &.large-margin {
    margin-top: 170px;
  }
  &__container {
    max-width: 1150px;
    padding: 0 0 0 240px;
    margin: 0 auto;
    display: flex;
  }
  &__behind {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.4px;
    color: #FF4949;
    font-weight: bold;
    min-width: 270px;
    text-align: right;
    margin-right: 40px;
  }
  &__text {
    font-size: 14px;
    color: #3C4858;
    line-height: 28px;
    img {
      vertical-align: middle;
    }
    a {
      color: #3C4858;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 30px;
    }
  }

  .recorder {
    color: #FF4949;
  }
  .github {
    color: #FF4949;
  }
}

@media (max-width: 719px) {
  .footer {
    &__container {
      flex-direction: column;
      padding: 0 20px;
    }
    &__behind {
      text-align: left;
      margin-bottom: 20px;
    }
  }
}
</style>
