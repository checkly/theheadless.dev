---
title: E2E Login scenarios
date: 2020-06-25
<<<<<<< HEAD
author: Giovanni Rago
tags: 
  - Puppeteer
  - E2E
  - Login
=======
author: Giovanni
tags: 
  - Puppeteer
  - E2E
>>>>>>> 3d0396672babe467629095389bfd309013b2f639
---

When automating key site transactions, we inevitably stumble into login scenarios. In most cases, users need to be able to access accounts on a platform to get any value out of it. If they suddenly become unable to do so, we need to be informed as quickly as possible.

In its simplest form, a login procedure requires the user to:

0. Navigate to the login form
1. Fill in a username/email field
2. Fill in a password field
3. Click a button to finalise the login

<<<<<<< HEAD
At the end of our test, we need to check if our login procedure has been successful. (4) For example, we could verify that an element is shown that we know only appears for logged-in users.

On our [test site](https://danube-store.herokuapp.com/) this could look like the following:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/login.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/login.js
:::
::::

Run this example as follows. Replace the username and password placeholder with your own credentials.

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
USER_EMAIL=username USER_PASSWORD=password node login.js
```
:::
::: tab Windows
```shell script
SET USER_EMAIL=username
SET USER_PASSWORD=password
node login.js
```
:::
::::

# Takeaways

- Use environment variables to inject secrets.
- You might need to wait for the navigation as you are redirected to the login screen/modal.

=======
At the end of our test, we need an assertion to tell us if our login procedure has been successful. (4) For example, we could verify that an element is shown that we know only appears for logged-in users.

On our [test site](https://danube-store.herokuapp.com/) this could look like the following:

```jsx
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.goto('https://danube-store.herokuapp.com/')
    
  await page.waitForSelector('#login') // 0
  await page.click('#login')
  
  await page.waitForSelector('#n-email') // 1
  await page.type('#n-email', 'user@email.com')
  
  await page.waitForSelector('#goto-signin-btn') // 2
  await page.click('#goto-signin-btn')
  
  await page.waitForSelector('#login-message') // 3
  await page.click('#login-message')

  assert.equals(await page.$(selector) !== null) // 4
  
  await browser.close()
})()
```

Social logins using accounts from Google, Github etc are also common. We are also able to automate these. For example, on Checkly:

```jsx
const puppeteer = require('puppeteer');
  (async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://app.checklyhq.com/login')

    const navigationPromise = page.waitForNavigation()

    await page.waitForSelector('.google-button')
    await page.click('.google-button')

    await navigationPromise
    await page.waitForSelector('input[type="email"]')
    await page.type('input[type="email"]', 'user@email.com')
    await page.click('#identifierNext')

    await page.waitForSelector('input[type="password"]', { visible: true })
    await page.type('input[type="password"]','password')

    await page.waitForSelector('#passwordNext', { visible: true })
    await page.click('#passwordNext')

    await navigationPromise

    await browser.close()
})()
```
>>>>>>> 3d0396672babe467629095389bfd309013b2f639
