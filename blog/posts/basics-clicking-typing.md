---
title: Clicking and typing
subTitle: Basic page interactions
date: 2020-06-15
author:
  - Giovanni Rago
  - Tim Nolet
githubUser:
  - ragog
  - tnolet
tags:
  - basics
---

Users normally access most website functionality through clicks, keystrokes etc. Puppeteer and Playwright allow us to replicate these events by referencing elements on the page using [CSS selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors).

<!-- more -->

## Clicking

Clicking is the default way of selecting and activating elements on web pages, and will appear very often in most headless scripts.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.waitForSelector('#login');
  await page.click('#login');

  await browser.close();
})()
```
:::

::: tab Playwright
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.click('#login');

  await browser.close();
})()
```
:::
::::

For the times when even the humble click fails, you can try the following alternatives:
1. `await page.click('#login', { force: true });` to force the click even if the selected element appears not to be accessible
2. `await page.$eval('#login', elem => elem.click());` to run the click inside the webpage
3. `await page.dispatchEvent('#login', 'click');` to directly dispatch the click event on the element

## Hovering

A popular pattern among web pages is exposing additional information or functionality when the user hovers the mouse cursor over a specific item. Examples include, menus, previews and dialogs containing extra information on the item.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.waitForSelector('a');
  await page.hover('a');

  await browser.close();
})()
```
:::

::: tab Playwright
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.hover('a');

  await browser.close();
})()
```
:::
::::

## Focussing

Focussing on specific UI elements allows the user to interact with them without clicks. It can also result in a proactive reaction from the webapp, such as displaying suggestions.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.waitForSelector('input');
  await page.focus('input');

  await browser.close();
})()
```
:::

::: tab Playwright
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.focus('input');

  await browser.close();
})()
```
:::
::::

## Typing

We can simulate typing on a real keyboard using `page.type()`:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.waitForSelector('input')
  await page.type('input', 'some search terms');

  await browser.close();
})()
```
:::

::: tab Playwright
```js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-webshop.herokuapp.com/');

  await page.fill('input', 'some search terms');

  await browser.close();
})()
```
:::
::::

Single key presses can also be executed. For example, to press the Enter key:
- Puppeteer: `await page.keyboard.press('Enter');`
- Playwright: `await page.press('Enter');`

Key presses can also be sent to a specific element:

`await (await page.$('input[type="text"]')).press('Enter');`

We can also hold down and release one or more keys, possibly combining them to use keyboard shortcuts:

```js
await page.keyboard.down('Control');
await page.keyboard.press('V');
await page.keyboard.up('Control');
```

You can run the above examples as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
node basic-click-type.js
```
:::
::: tab Windows
```sh
node basic-click-type.js
```
:::
::::

## Further reading
1. The related official documentation of [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-pageclickselector-options) and [Playwright](https://playwright.dev/#version=v1.2.1&path=docs%2Finput.md&q=)
2. [Finding effective selectors](basics-selectors/)
