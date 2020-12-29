---
title: Taking screenshots
subTitle: Leveraging images for troubleshooting and more
date: 2020-06-23
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
---

Headless browsers are fully capable of taking screenshots, which is very useful in troubleshooting failures or faulty scripts. Using additional libraries and tools, it is also possible to automate visual comparisons.

<!-- more -->

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

## Full page screenshots

Adding the `fullPage: true` option allows for the capture of full page screenshots, overriding the `height` parameter specified for our viewport: 

```js
await page.screenshot({ path: 'my_screenshot.png', fullPage: true })
```

## Clipped screenshots

Having our screenshot limited to a smaller portion of the viewport is also possible. All we need to do is specify the coordinates of the top left corner of the screenshot, plus `width` and `height`. We then pass these options to:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-screenshot-clipped.js{1-10}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-screenshot-clipped.js{1-10}
:::
::::

The above examples can be run as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-screenshots.js
```
:::
::: tab Windows
```shell script
node basic-screenshots.js
```
:::
::::

## Use in visual regression testing

Screenshots can be fed to image comparison libraries, such as [Resemble.js](https://github.com/rsmbl/Resemble.js), [pixelmatch](https://github.com/mapbox/pixelmatch), [Rembrandt.js](http://rembrandtjs.com/) or others in order to determine whether our latest sets of screenshots contains significant differences when measured against a baseline.

Some libraries, like [Differencify](https://github.com/NimaSoroush/differencify) and [jest-puppeteer-docker](https://github.com/gidztech/jest-puppeteer-docker), already combine Puppeteer with visual comparison libraries while exposing higher-level config to the user. 

## Further reading
1. Official documentation for taking screenshots with [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.5.0&show=api-pagescreenshotoptions) and [Playwright](https://playwright.dev/docs/verification?_highlight=screenshot#screenshots)
2. Blog post from baseweb.design on the whys and hows of [visual regression testing](https://baseweb.design/blog/visual-regression-testing/)
3. Blog post from Gideon Pyzer looking at different visual [regression testing tools](https://gideonpyzer.dev/blog/2018/06/25/visual-regression-testing/)