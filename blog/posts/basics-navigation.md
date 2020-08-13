---
title: Basic navigation
date: 2020-06-15
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
---

Every useful script that we will write will almost certainly include two key initial steps:

1. Launching the browser
2. Navigating to a page

<!-- more -->

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-browser-navigation.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-browser-navigation.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
node basic-browser-navigation.js
```
:::
::: tab Windows
```sh
node basic-browser-navigation.js
```
:::
::::

We also add `await browser.close()` to ensure that we are shutting down our browser before terminating the session. Without it, our execution would not return after the page has loaded, keeping our test hanging indefinitely.

Now that we know how to start a browser and navigate to a URL, the clear next step is to learn how to [interact with a webpage](basics-clicking-typing.md).

## Further reading
1. The list of available options to customise our browser setup on launch with [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-puppeteerlaunchoptions) or [Playwright](https://playwright.dev/#version=v1.2.1&path=docs%2Fapi.md&q=browsertypelaunchoptions)
2. Debugging tips for [Puppeteer](https://developers.google.com/web/tools/puppeteer/debugging) and [Playwright](https://playwright.dev/#version=v1.2.1&path=docs%2Fdebug.md&q=)
