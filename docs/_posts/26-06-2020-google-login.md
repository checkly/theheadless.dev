---
title: Login with Google
date: 2020-06-22
author: Tim Nolet
tags: 
  - Puppeteer
  - Playwright
  - Login
---

Social login using your personal Google or Google Gsuite account is an extremely common use case for many login scenarios.

# Steps

1. We start at a site that offers Google as an authentication provider. In this case we use https://stackoverflow.com/
2. We fetch the login page and click the "Login with Google" button.
3. We are redirect to Google.
4. We provide the username and password, injected by using environment variables.
5. We are redirected back to the starting

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/google-login.js
:::

::: tab Playwright
<<< @/blog/snippets/playwright/google-login.js
:::

::::

Run this example as follows. Replace the username and password placeholder with your own credentials.

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
GOOGLE_USER=username GOOGLE_PWD=password node mslive-login.js
```
:::
::: tab Windows
```shell script
SET GOOGLE_USER=username
SET GOOGLE_PWD=password
node google-login.js
```
:::
::::


> Note: this example does not work when you have 2-factor authentication enabled.

> Note: you might trigger a recaptcha check.


# Takeaways

- Use environment variables to inject secrets.
- Wait for the navigation as your are redirected to Google.
- Wait for the navigation as you are redirected back to the start site.





