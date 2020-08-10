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
        text: 'MIT Licensed | Copyright © 2020-present Checkly inc.',
        link: 'https://opensource.org/licenses/MIT'
      }
    ]
  },
  algolia: {
    apiKey: 'b2b616fdea14b860ff00c72fa72bf267',
    indexName: 'checkly_docs'
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
    }]
  ],
  themeConfig
}
