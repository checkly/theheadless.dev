module.exports = {
  plugins: ["tabs"],
  title: "Checkly Guides",
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    hostname: "https://guides.checklyhq.com",
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
          text: "MIT Licensed | Copyright © 2018-present Vue.js",
          link: "",
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
  },
};
