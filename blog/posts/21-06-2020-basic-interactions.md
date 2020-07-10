---
title: Basic page interactions
date: 2020-06-21
author: Giovanni Rago
tags: 
  - Puppeteer
  - JavaScript
  - Playwright
---

We normally access most website functionality through clicks, taps, typing etc. Puppeteer and Playwright allow us to replicate these events by finding elements on the page using CSS selectors:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-interactions.js
:::

::: tab Playwright
<<< @/blog/snippets/playwright/basic-interactions.js
:::

::::

Run this example as follows.
```shell script
node basic-interactions.js
```

# Takeaways

- Puppeteer and Playwright allow us to interact with websites through their UI.