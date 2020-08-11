---
title: E2E Login
date: 2020-06-25
author: Giovanni Rago
githubUser: ragog
tags: 
  - E2E
  - Login
---

When automating key site transactions, we inevitably stumble into login scenarios. In most cases, users need to be able to access accounts on a platform to get any value out of it. If they suddenly become unable to do so, we need to be informed as quickly as possible.

## Steps

In its simplest form, a login procedure requires the user to:

0. Navigate to the login form
1. Fill in a username/email field
2. Fill in a password field
3. Click a button to finalise the login

At the end of our test, we need to check if our login procedure has been successful. (4) For example, we could verify that an element is shown that we know only appears for logged-in users.

On our [test site](https://danube-webshop.herokuapp.com/) this could look like the following:

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

## Takeaways

- Use environment variables to inject secrets.
- You might need to wait for the navigation as you are redirected to the login screen/modal.

