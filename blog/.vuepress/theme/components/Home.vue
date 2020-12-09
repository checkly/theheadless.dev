<template>
  <main aria-labelledby="main-title">
    <div class="home">
      <div class="home__top">
        <h1>Learn <span>Puppeteer & Playwright</span></h1>
        <h2>Tips, tricks and in-depth guides from the trenches</h2>

        <div class="home__top__icons">
          <div class="home__top__icons--left">
            <span />
            <span />
            <span />
          </div>
          <span><img
            src="/puppeteer.png"
            width="40"
          ></span>
          <span class="playwright">🎭</span>
          <div class="home__top__icons--right">
            <span />
            <span />
            <span />
          </div>
        </div>

        <router-link
          to="/posts/"
          class="button home__top__dive"
          tag="button"
        >
          Dive into it
        </router-link>
      </div>

      <div class="home__recent">
        <div class="home__recent__icon">
          <Icon
            name="chevron-down"
            :width="20"
          />
        </div>
        <h3>Recent guides</h3>
        <div class="home__posts">
          <router-link
            v-for="page in recentPosts"
            :key="page.path"
            class="home__posts__post"
            :to="page.path"
            tag="div"
          >
            <div class="home__posts__post__title">
              {{ page.title }}
            </div>
            <p>{{ page.summary }}</p>
            <div class="home__posts__post__author">
              <PostMeta
                :author="page.frontmatter.author"
                :github-user="page.frontmatter.githubUser"
              />
            </div>
          </router-link>
        </div>
        <div class="home__recent__learn">
          <router-link to="/posts/">
            See learn all <Icon name="arrow-right" />
          </router-link>
        </div>

        <p class="home__recent__whatis">
          What is <a
            href="https://github.com/puppeteer/puppeteer"
            target="_blank"
          >Puppeteer <Icon name="share" /></a> and <a
            href="https://github.com/microsoft/playwright"
            target="_blank"
          >Playwright <Icon name="share" /></a>?
        </p>
      </div>
    </div>

    <Contributors />

    <div class="home">
      <div class="home__subscribe">
        <SimpleNewsletter v-slot="{ slotProps }">
          <h1>{{ slotProps.title }}</h1>
          <p>{{ slotProps.content }}</p>
          <input
            class="my-input"
            type="email"
            name="email"
            aria-label="Email"
            placeholder="Your precious email"
            v-model="slotProps.mail"
            required
            autocapitalize="off"
            autocorrect="off"
            data-cy="email"
          >
          <button
            type="submit"
            class="button"
            data-cy="submit"
          >
            {{ slotProps.submitText }}
          </button>
        </SimpleNewsletter>

        <small class="home__subscribe__spam">We never spam.</small>
      </div>
    </div>
  </main>
</template>

<script>
import SimpleNewsletter from 'vuepress-plugin-mailchimp/src/components/SimpleNewsletter'
import NavLink from './NavLink.vue'
import Icon from './Icon.vue'
import Contributors from './Contributors'

import PostMeta from './PostMeta'

export default {
  components: { NavLink, Icon, SimpleNewsletter, Contributors, PostMeta },

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
        .sort((a, b) => {
          return new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
        })
      return posts.slice(0, 6)
    }
  }
}
</script>

<style lang="scss">
.home {
  max-width: 1150px;
  margin: 50px auto;
  &__top {
    text-align: center;
    h1 {
      font-size: 52px;
      color: #161616;
      letter-spacing: 0.4px;
      line-height: 48px;
      span {
        background: linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,97,154,1) 100%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    h2 {
      border-bottom: 0;
      color: #697280;
      font-size: 32px;
      letter-spacing: 0.4px;
      font-weight: 300;
      padding-top: 0;
      margin-top: 30px;
    }
    &__icons {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 25px 0;
      &--left,
      &--right {
        position: relative;
        span {
          width: 14px;
          height: 3px;
          background-color: #FF4949;
          top: 0;
          left: 0;
          position: absolute;
        }
      }
      &--left {
        margin-right: 50px;
        span:first-child {
          top: -20px;
          transform: rotate(25deg);
        }
        span:last-child {
          transform: rotate(-25deg);
          top: 20px;
        }
      }
      &--right {
        margin-left: 30px;
        span:first-child {
          top: -20px;
          transform: rotate(150deg);
        }
        span:last-child {
          transform: rotate(195deg);
          top: 20px;
        }
      }
      .playwright {
        font-size: 50px;
        margin-left: 20px;
      }
    }
    &__dive {
      width: 349px;
      height: 67px;
    }
  }
  &__recent {
    padding-bottom: 50px;

    h3 {
      text-align: center;
      text-transform: uppercase;
      font-size: 24px;
      color: #697280;
      opacity: 0.5;
      letter-spacing: 5px;
      font-weight: 300;
    }
    &__icon {
      text-align: center;
      color: #FF4949;
      margin-top: 80px;
    }
    &__learn {
      text-align: center;
      font-size: 24px;
      margin-top: 50px;
      a {
        color: #000;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        font-weight: bold;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          width: 8px;
          height: 40px;
          background-color: #FF4949;
          transform: rotate(45deg);
          left: 17px;
          top: -3px;
        }
      }
    }
    &__whatis {
      color: #697280;
      text-align: center;
      margin-top: 100px;
      a {
        text-decoration: underline;
      }
    }
  }
  &__posts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 30px;
    row-gap: 30px;
    margin-top: 40px;
    &__post {
      border: 7px solid #E0E6ED;
      box-sizing: border-box;
      border-radius: 15px;
      padding: 20px;
      cursor: pointer;
      transition: border-color ease-in-out 300ms;
      display: flex;
      flex-direction: column;
      &:hover {
        border-color: #8492A6;
      }
      &__title {
        font-size: 22px;
        color: #000000;
        font-weight: bold;
      }
      p {
        font-size: 14px;
        color: #3C4858;
        margin: 15px 0 0 0;
      }
      &__author {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #8492A6;
        padding-top: 20px;
        margin-top: auto;
        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
  &__subscribe {
    border: 7px solid #E0E6ED;
    box-sizing: border-box;
    border-radius: 15px;
    text-align: center;
    padding: 40px 0;
    margin-top: 120px;
    h1 {
      font-size: 42px;
      letter-spacing: 0.4px;
      color: #161616;
      margin: 0px !important;
      padding: 0px !important;;
    }
    p {
      font-size: 24px;
      letter-spacing: 0.4px;
      color: #161616;
      font-weight: 300;
      margin-top: 10px !important;
      margin-bottom: 40px;
    }
    form {
      display: flex;
      flex-direction: column;
      max-width: 680px;
      margin: 0 auto;
      input {
        background: #E0E6ED;
        border-radius: 15px;
        padding: 15px;
        font-size: 20px;
        border: 0;
        outline: none;
        color: #8492A6;
        margin-bottom: 15px;
      }
      button {
        margin-bottom: 15px;
      }
    }
    &__spam {
      color: #8492A6;
      font-size: 16px;
    }
  }
}

.button {
  height: 67px;
  background-color: #FF4949;
  border-radius: 100px;
  outline: none;
  border: 0;
  cursor: pointer;
  font-size: 22px;
  color: #FFF;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-bottom: 8px solid #DF0000;
  font-family: 'Poppins', sans-serif;
  &:active {
    border-bottom-width: 5px;
  }
  &:hover {
    background-color: #ff3939;
  }
}

@media (max-width: 719px) {
  .home {
    &__top {
      padding: 0 10px;
      h1 {
        span {
          display: inline-block;
          padding-bottom: 15px;
        }
      }
    }
    &__posts {
      display: block;
      &__post {
        margin-bottom: 20px;
      }
    }
    &__subscribe {
      padding: 40px 20px;
      .button {
        font-size: 16px;
      }
    }
  }
}
</style>
