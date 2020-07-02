module.exports = {
  plugins: ["tabs"],
  title: "Headless Guides",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/logo_racoon.svg",
    sidebar: [
      {
        title: "Group 1", // required
        path: "/foo/", // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1, // optional, defaults to 1
        children: ["/"],
      },
      {
        title: "Group 2",
        children: [],
      },
    ],
    sitemap: {
      hostname: "https://guides.checklyhq.com",
    },
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/vuejs/vuepress",
        },
        {
          type: "twitter",
          link: "https://github.com/vuejs/vuepress",
        },
      ],
      copyright: [
        {
          text: "Privacy Policy",
          link: "https://policies.google.com/privacy?hl=en-US",
        },
        {
          text: "MIT Licensed | Copyright © 2018-present Checkly inc.",
          link: "cdcd",
        },
      ],
    },
    smoothScroll: true,
    feed: {
      canonical_base: "https://guides.checklyhq.com",
      rss2: {
        enable: true,
        file_name: "rss.xml",
        head_link: {
          enable: true,
          type: "application/rss+xml",
          title: "%%site_title%% RSS Feed",
        },
      },
      posts_directories: ["/_posts/"],
    },
    algolia: {
      apiKey: "b2b616fdea14b860ff00c72fa72bf267",
      indexName: "checkly_docs",
    },
    docsRepo: "checkly/guides.checklyhq.com",
    docsDir: "blog",
    docsBranch: "master",
    editLinks: true,
    editLinkText: "Help us improve this page!",
  },
};
