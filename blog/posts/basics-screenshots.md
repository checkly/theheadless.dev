---
title: Taking screenshots
date: 2020-06-23
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

Headless browsers are fully capable of taking screenshots, which can be very useful in troubleshooting failures or faulty scripts. Through the use of additional libraries and tools, it is also possible to automate visual comparisons using 

## Generating and saving screenshots

The `page.screenshot` command is consistent across Puppeteer and Playwright, and allows us to save one or more screenshots of the current page to a specified path. Without any additional options, the size of the screenshot will depend on that of the viewport:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-screenshot.js{6,8}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-screenshot.js{6,8}
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-screenshot.js
```
:::
::: tab Windows
```shell script
node basic-screenshot.js
```
:::
::::

## Full page screenshots

Adding the `fullPage: true` option allows for the capture of full page screenshots, overriding the `height` parameter specified for our viewport: 

```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```

## Clipped screenshots

Having our screenshot limited to a smaller portion of the viewport is also possible:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-screenshot-clipped.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-screenshot-clipped.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-screenshot-clipped.js
```
:::
::: tab Windows
```shell script
node basic-screenshot-clipped.js
```
:::
::::

## Use in visual regression testing

[BackstopJS](https://github.com/garris/BackstopJS)
[jest-puppeteer-docker](https://github.com/gidztech/jest-puppeteer-docker)

[Resemble.js](https://github.com/rsmbl/Resemble.js)
[pixelmatch](https://github.com/mapbox/pixelmatch)
[Rembrandt.js](http://rembrandtjs.com/)

## Further reading
