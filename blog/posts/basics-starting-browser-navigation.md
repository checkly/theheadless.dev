---
title: Starting the browser and navigating to a webpage
date: 2020-07-30
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

Every useful script that we will write will almost certainly include two key initial steps:
1. Launching the browser
2. Navigating to a page

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-browser-navigation.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-browser-navigation.js
:::
::::

You can run this example as follows:

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-browser-navigation.js
```
:::
::: tab Windows
```shell script
node basic-browser-navigation.js
```
:::
::::

We also add `await browser.close()` to ensure that we are shutting down our browser before terminating the session. Without it, our execution would not return after the page has loaded, keeping our test hanging indefinitely.