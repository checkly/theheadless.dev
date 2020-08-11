---
title: Setting up Puppeteer or Playwright locally
date: 2020-06-20
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
---

Assuming you already have [Node.js](https://nodejs.org/) available in your local environment, installing Puppeteer or Playwright is achieved with just one instruction. Let's start by creating the folder where we will be storing our scripts going forward.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
```sh
mkdir learning-headless && cd $_
npm i puppeteer
```
:::

::: tab Playwright
```sh
mkdir learning-headless && cd $_
npm i playwright
```
:::
::::

Puppeteer and Playwright come bundled with their respective browsers, so we now have all we need to run our first script. Let's create a script to navigate to our [test website](https://danube-webshop.herokuapp.com):

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-navigation.js
:::

::: tab Playwright
<<< @/blog/snippets/playwright/basic-navigation.js
:::

::::

Run this example as follows:
```sh
node hello-world.js
```

Nothing much has happened, right? Remember: by default, Puppeteer and Playwright will run in headless mode! That means we won't see anything of what is happening in the browser when our script runs.

::: tip
Puppeteer/Playwright creates its own browser user profile, which it cleans up on every run. In other words: all runs will be sandboxed and not interfere with one another, as state is always fully reset at the end of a session.
:::

When you are first writing and debugging your scripts, it is a good idea to disable headless mode so you can have a look at what your script is doing:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
```js
const browser = await puppeteer.launch({ headless: false });
```
:::

::: tab Playwright
```js
const browser = await chromium.launch({ headless: false });
```
:::

::::

After executing the updated file, you will see Chromium starting up, only to shut down after an instant. Everything is working as expected! Our script is just so short, it runs almost instantaneously.