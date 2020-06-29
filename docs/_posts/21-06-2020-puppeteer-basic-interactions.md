---
title: Basic page interactions
date: 2020-06-21
author: Giovanni
tags: 
  - Puppeteer
  - JavaScript
---

We normally access most website functionality through clicks, taps, typing etc. Puppeteer allows us to replicate these events by finding elements on the page using CSS selectors. Let's expand our hello-world script by clicking a couple of links:

```jsx
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://example.com');

	await page.waitForSelector('a'); // wait until the element appears
  await page.click('a'); // click the element

  await page.waitForSelector('a[href="/go/rfc2606"]'); // wait until the element appears
  await page.click('a[href="/go/rfc2606"]'); // click the element

  await browser.close();

})();
```

After kicking off the script, we will see the clicks being performed and our browser moving between pages. Just like a real user would!

Typing is performed in a similar way:

```jsx
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://danube-store.herokuapp.com');

	await page.waitForSelector('input');
	await.page.type('input', 'some search terms');

  await page.waitForSelector('button');
	await page.click('button');

  await browser.close();

})();
```