module.exports = {
  plugins: ['tabs'],
  title: 'Headless.dev',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
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
      { text: 'Guides', link: '/posts/' },
      { text: 'GitHub', link: 'https://github.com/checkly/guides.checklyhq.com' }
    ],
    sitemap: {
      hostname: 'https://guides.checklyhq.com'
    },
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
    smoothScroll: true,
    feed: {
      canonical_base: 'https://guides.checklyhq.com',
      rss2: {
        enable: true,
        file_name: 'rss.xml',
        head_link: {
          enable: true,
          type: 'application/rss+xml',
          title: '%%site_title%% RSS Feed'
        }
      },
      posts_directories: ['/posts/']
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
}
