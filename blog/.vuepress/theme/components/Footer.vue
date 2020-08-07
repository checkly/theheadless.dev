<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__behind">
        Who's running this?
      </div>
      <div class="footer__text">
        We are the folks behind <a
          href="https://checklyhq.com/?utm_source=headless-dev&utm_campaign=headless-dev"
          target="_blank"
        ><img
          src="/checkly.svg"
          width="80"
        ></a> and we do API monitoring and synthetic monitoring using Puppeteer and very soon™ Playwright. This means we see A LOT of headless browser workloads so we thought we’d share some of our learnings with the community.<br>
        Feel to contribute by just creating PR on Github!

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
  &__container {
    max-width: 1150px;
    margin: 0 auto;
    display: flex;
  }
  &__behind {
    font-size: 24px;
    line-height: 28px;
    letter-spacing: 0.4px;
    color: #FF4949;
    font-weight: bold;
    min-width: 350px;
    text-align: right;
    margin-right: 40px;
  }
  &__text {
    font-size: 14px;
    color: #3C4858;
    img {
      vertical-align: middle;
    }
    a {
      color: #8492A6;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 30px;
    }
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
