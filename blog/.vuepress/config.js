const themeConfig = {
  logo: '/logo_racoon.svg',
  sidebar: [
    {
      title: 'The Basics', // required
      collapsable: false, // optional, defaults to true
      sidebarDepth: 1, // optional, defaults to 1
      children: [
        ['/posts/basics', 'Basics'],
        ['/posts/more-basics', 'More basics']
      ]
    }
  ],
  nav: [
    { text: 'Posts', link: '/posts/' },
    { text: 'GitHub', link: 'https://github.com/checkly/guides.checklyhq.com' }
  ],
  sitemap: {
    hostname: 'https://guides.checklyhq.com'
  },
  summary: true,
  summaryLength: 200,
  footer: {
    contact: [
      {
        type: 'github',
        link: 'https://github.com/vuejs/vuepress'
      },
      {
        type: 'twitter',
        link: 'https://github.com/vuejs/vuepress'
      }
    ],
    copyright: [
      {
        text: 'Privacy Policy',
        link: 'https://policies.google.com/privacy?hl=en-US'
      },
      {
        text: 'MIT Licensed | Copyright © 2020-present Checkly inc.',
        link: 'cdcd'
      }
    ]
  },
  algolia: {
    apiKey: 'b2b616fdea14b860ff00c72fa72bf267',
    indexName: 'checkly_docs'
  },
  docsRepo: 'checkly/guides.checklyhq.com',
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
        lengthPerPage: 5
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
    canonical_base: 'https://guides.checklyhq.com'
  },
  sitemap: {
    hostname: 'https://guides.checklyhq.com'
  }
}

module.exports = {
  title: 'headless.dev',
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
    'tabs'
  ],
  themeConfig
}
