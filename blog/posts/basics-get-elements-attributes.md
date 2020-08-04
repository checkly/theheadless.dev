---
title: Get element attributes
date: 2020-08-04
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

Referencing UI elements from our target application to extract certain attribute values is something that will come up over and over again as we use Puppeteer and Playwright. It is essential to both scraping, for gathering the desired information off the page, and testing, where it is often powering our assertions.

Below is an example running against our [test site](https://danube-store.herokuapp.com), getting and printing out the `href` attribute of the first `a` element on the homepage. That just happens to be our logo, which links right back to our homepage, and therefore will have an `href` element which equals the URL we navigate to using `page.goto()`:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-get-href-value.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-href-value.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-get-href-value.js
```
:::
::: tab Windows
```shell script
node basic-get-href-value.js
```
:::
::::

Similarly, we can get attributes from multiple elements at once. For example, the `innerText` of each product preview shown on the homepage, which in this case is the title of each book:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-get-text-values.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-text-values.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-get-text-values.js
```
:::
::: tab Windows
```shell script
node basic-get-text-values.js
```
:::
::::

As an alternative, it is also possible to retrieve an ElementHandle and then retrieve a property value from it. Following is an example printing the `href` value of the first `a` element of our homepage:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-get-href-handle.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-href-handle.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-get-href-handle.js
```
:::
::: tab Windows
```shell script
node basic-get-href-handle.js
```
:::
::::

## Further reading
1. Mozilla's list of [HTML attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
2. [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-pageevalselector-pagefunction-args)'s and [Playwright](https://playwright.dev/#version=v1.2.1&path=docs%2Fapi.md&q=pageevalselector-pagefunction-arg)'s official API reference on the topic
3. An [E2E example test](e2e-coupon.md) asserting agains an element's `innerText`