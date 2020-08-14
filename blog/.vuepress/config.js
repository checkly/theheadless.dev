const themeConfig = {
  logo: '',
  sidebar: [
    {
      title: '🎓 Headless 101', // required
      collapsable: false, // optional, defaults to true
      sidebarDepth: 0, // optional, defaults to 1
      children: [
        ['/posts/basics-puppeteer-intro', 'What is Puppeteer?'],
        ['/posts/basics-playwright-intro', 'What is Playwright?'],
        ['/posts/basics-local-setup', 'Installation & setup'],
        ['/posts/basics-navigation', 'Basic navigation'],
        ['/posts/basics-selectors', 'Using selectors'],
        ['/posts/basics-clicking-typing', 'Clicking & typing']
      ]
    }
  ],
  nav: [
  ],
  sitemap: {
    hostname: 'https://theheadless.dev'
  },
  summary: true,
  summaryLength: 200,
  footer: {
    copyright: [
      {
        text: 'CC-BY-4.0 Licensed | Copyright © 2020-present Checkly inc.',
        link: 'https://creativecommons.org/licenses/by-sa/4.0/'
      }
    ]
  },
  algolia: {
    apiKey: 'dcb1395d32100bc066d21f302fb6c0df',
    indexName: 'theheadless_dev'
  },
  docsRepo: 'checkly/theheadless.dev',
  docsDir: 'blog',
  docsBranch: 'master',
  editLinks: true,
  editLinkText: 'Edit this guide'
}

const vuePressBlogConfig = {
  directories: [
    {
      id: 'post',
      dirname: 'posts',
      path: '/posts/',
      itemPermalink: '/posts/:slug', // Permalink for matched pages.
      pagination: {
        lengthPerPage: 15
      }
    }
  ],
  frontmatters: [
    {
      id: 'tag',
      keys: ['tags'],
      path: '/tag/'
    }
  ],
  globalPagination: {
    lengthPerPage: 5
  },
  feed: {
    canonical_base: 'https://theheadless.dev'
  },
  sitemap: {
    hostname: 'https://theheadless.dev'
  }
}

const shareImage = 'https://og-image.theheadless.dev/intro.png?intro=true'

module.exports = {
  title: 'The headless.dev - Learn Puppeteer & Playwright',
  markdown: {
    lineNumbers: true
  },
  plugins: [
    ['@vuepress/blog', vuePressBlogConfig],
    '@vuepress/plugin-nprogress',
    ['@vuepress/medium-zoom', true],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10
      }
    ],
    ['smooth-scroll', true],
    'tabs',
    ['vuepress-plugin-code-copy', {
      color: '#FFF',
      staticIcon: true,
      align: 'top'
    }],
    ['vuepress-plugin-mailchimp', {
      endpoint: 'https://checklyhq.us15.list-manage.com/subscribe/post?u=9af9712f622c6511cb2113669&id=a897f939ef',
      title: 'Don\'t miss a bit',
      content: 'You\'ll get an update whenever we publish a new guide',
      submitText: 'Subscribe to theheadless.dev'
    }],
    ['vuepress-plugin-container', {
      type: 'tip'
    }],
    ['vuepress-plugin-container', {
      type: 'danger'
    }],
    ['vuepress-plugin-container', {
      type: 'warning'
    }],
    ['@vuepress/google-analytics', {
      ga: 'UA-110523681-5'
    }]
  ],
  themeConfig,
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.png' }],
    ['meta', { property: 'og:image', content: shareImage }],
    ['meta', { name: 'twitter:image', content: shareImage }]
  ]
}
