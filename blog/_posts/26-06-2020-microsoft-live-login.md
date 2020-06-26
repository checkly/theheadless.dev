---
title: Microsoft Live login
date: 2020-06-22
author: Tim Nolet
tags: 
  - Puppeteer
  - Playwright
  - Login
---

Log in to your Microsoft Live account

# Steps

1. We start at https://login.live.com/
4. We provide the username and password, injected by using environment variables.
5. We are redirected to the main account page

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/mslive-login.js
:::

::: tab Playwright
<<< @/blog/snippets/playwright/mslive-login.js
:::

::::

Run this example as follows. Replace the username and password placeholder with your own credentials.

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
MSLIVE_USER=username MSLIVE_PWD=password node google-login.js
```
:::
::: tab Windows
```shell script
SET MSLIVE_USER=username
SET MSLIVE_PWD=password
node mslive-login.js
```
:::
::::


> Note: this example does not work when you have 2-factor authentication enabled.

> Note: you might trigger a recaptcha check.


# Takeaways

- Use environment variables to inject secrets.
- Wait for the navigation as your are redirected to Google.
- Wait for the navigation as you are redirected back to the start site.





