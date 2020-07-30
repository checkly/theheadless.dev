---
title: Clicking and typing
date: 2020-07-30
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

We normally access most website functionality through clicks, taps, typing etc. Puppeteer and Playwright allow us to replicate these events by referencing elements on the page using [CSS selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors):

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-click-type.js
:::

::: tab Playwright
<<< @/blog/snippets/playwright/basic-click-type.js
:::
::::

You can run this example as follows:

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-click-type.js
```
:::
::: tab Windows
```shell script
node basic-click-type.js
```
:::
::::

## Further reading
- [Finding effective selectors](./selectors.md)