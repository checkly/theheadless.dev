---
title: Managing cookies
date: 2020-10-08
author: Giovanni Rago
githubUser: ragog
tags: 
  - cookies
---

The [HyperText Transfer Protocol (HTTP)](https://developer.mozilla.org/en-US/docs/Web/HTTP#:~:text=Hypertext%20Transfer%20Protocol%20(HTTP)%20is,be%20used%20for%20other%20purposes.) is stateless, but cookies allow it to keep context consistent over the course of a session. In other words, by having our browser automatically exchange small amounts of data, we get to have websites recognise us and remember our preferences, the contents of our shopping baskets or the fact that we had just logged in to our account.

This article shows how we can manage cookies with ease with Puppeteer and Playwright.

<!-- more -->

## Reading, setting and clearing cookies

Reading or modifying cookies opens up useful possibilities. A practical example is skipping authentication when testing features available only after login. We could automate the login procedure, but there is no point in going through it for every test in our suite. Saving time this way might free up precious time, speeding up delivery.

The following examples show how we can save existing cookies after logging in to GitHub and reuse them later to skip login. First, let us perform login with our credentials, read the cookies and save them to a file.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/cookies-reading.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/cookies-reading.js
:::
::::

Checking out our saved cookies file after a successful login will show us something like the following:

```json
[
    {
        "name": "dotcom_user",
        "value": YOUR_USERNAME,
        "domain": ".github.com",
        "path": "/",
        "expires": 1633622615.629729,
        "size": 16,
        "httpOnly": true,
        "secure": true,
        "session": false,
        "sameSite": "Lax"
    },
    {
        "name": "user_session",
        "value": YOUR_USER_SESSION_TOKEN,
        "domain": "github.com",
        "path": "/",
        "expires": 1603296216.923899,
        "size": 60,
        "httpOnly": true,
        "secure": true,
        "session": false,
        "sameSite": "Lax"
    },

    ...

]
```

We can save cookies in a file or so, or use env if kicking off a new session directly. Now to reuse the same cookies:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/cookies-writing.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/cookies-writing.js
:::
::::

## LocalStorage and SessionStorage

Cookies are sent with every request, potentially deteriorating [performance](basics-performance.md) if used for storing large amounts of data. The [localStorage and sessionStorage](https://javascript.info/localstorage) APIs can help us with offloading part of this data to the browser. Just like with cookies, Puppeteer and Playwright make accessing LocalStorage and SessionStorage straightforward.

Our test site, Danube, actually uses LocalStorage to keep track of many things, such as your login state. Let's skip login on Danube by accessing LocalStorage.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/localstorage-danube.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/localstorage-danube.js
:::
::::

All the above examples can be run as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node managing-cookies.js
```
:::
::: tab Windows
```shell script
node managing-cookies.js
```
:::
::::

## Further reading
1. [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
2. [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagecookiesurls) [Playwright](https://playwright.dev/#version=v1.4.2&path=docs%2Fauth.md&q=cookies)