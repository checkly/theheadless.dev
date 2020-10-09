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

Reading or modifying cookies opens up useful possibilities. A practical example is skipping authentication when testing features available only after login. We could automate the login procedure, but there is no point in going through it for every test in our suite. Skipping it might free up precious time, speeding up delivery.

The following examples show how we can save existing cookies after logging in to GitHub and reuse them later to skip login. First, let us perform login with our credentials, read the cookies and save them to a file.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/cookies-reading.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/cookies-reading.js
:::
::::

After a successful login, our saved cookies file will look something like this:

```json
[
    {
        "name": "dotcom_user",
        "value": <YOUR_USERNAME>,
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
        "value": <YOUR_USER_SESSION_TOKEN>,
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

Now to reuse the same cookies:

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

Our test site, Danube, actually uses LocalStorage to keep track of a few things, such as the content of your cart. Let's see how we can access this state and then replicate it in a later session.

We will first fill in the cart by adding three items, then we will copy the contents of LocalStorage to a file.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/localstorage-reading.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/localstorage-reading.js
:::
::::

In this case our file will look as follows:

```json
{
  "cartContent": "[{\"id\":1,\"title\":\"Haben oder haben\",\"author\":\"Fric Eromm\",\"genre\":\"philosophy\",\"price\":\"9.95\",\"rating\":\"★★★★☆\",\"stock\":\"1\"},{\"id\":2,\"title\":\"Parry Hotter\",\"author\":\"J/K Rowlin'\",\"genre\":\"erotic\",\"price\":\"9.95\",\"rating\":\"★★★☆☆\",\"stock\":\"1\"},{\"id\":3,\"title\":\"Laughterhouse-Five\",\"author\":\"Truk Tugennov\",\"genre\":\"scifi\",\"price\":\"9.95\",\"rating\":\"★★★☆☆\",\"stock\":\"1\"}]"
}
```

We can use the content of this file to set LocalStorage in a separate session. That way we will immediately start with the three items already in our shopping cart, potentially getting us closer to a specific scenario we want to test and thereby saving ourselves time.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/localstorage-writing.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/localstorage-writing.js
:::
::::

::: tip
You can interact with sessionStorage very much like we did with localStorage.
:::

All the above examples can be run as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
GITHUB_USER=username GITHUB_PWD=password node managing-cookies.js
```
:::
::: tab Windows
```shell script
SET GITHUB_USER=username
SET GITHUB_PWD=password
node managing-cookies.js
```
:::
::::

## Takeaways

## Further reading
1. The official MDN docs for [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies).
2. A practical guide to the [Web Storage APIs](https://javascript.info/localstorage), SessionStorage and LocalStorage.
2. [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagecookiesurls) [Playwright](https://playwright.dev/#version=v1.4.2&path=docs%2Fauth.md&q=cookies).