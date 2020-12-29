---
title: Scraping pages
subTitle: Extracting valuable information through automation
date: 2020-08-26
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
  - scraping
  - assertions
---

We call the action of extracting data from web pages _web scraping_. Scraping is useful for a variety of use cases:

1. In testing and monitoring, asserting against the state of one or more elements on a page
2. In general, gathering data for a variety of different purposes

<!-- more -->

## Scraping element attributes & properties

Below is an example running against our [test site](https://danube-webshop.herokuapp.com), getting and printing out the `href` attribute of the first `a` element on the homepage. That just happens to be our logo, which links right back to our homepage, and therefore will have an `href` value equal to the URL we navigate to using `page.goto()`:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-get-href-value.js{7}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-href-value.js{7}
:::
::::

As an alternative, it is also possible to retrieve an [ElementHandle](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-class-elementhandle) and then retrieve a property value from it. Following is an example printing the `href` value of the first `a` element of our homepage:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-get-href-handle.js{7,8}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-href-handle.js{7,8}
:::
::::

::: tip
The `innerText` property is often used in tests to assert that some element on the page contains the expected text.
:::

## Scraping lists of elements

Scraping element lists is just as easy. For example, let's grab the `innerText` of each product category shown on the homepage:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-get-text-values.js{7-9}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-text-values.js{7-9}
:::
::::

## Scraping images

Scraping images from a page is also possible. For example, we can easily get the logo of our test website and save it as a file:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-get-image.js{9,11,12}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-image.js{9,11,12}
:::
::::

We are using [axios](https://github.com/axios/axios) to make a `GET` request against the source URL of the image. The response body will contain the image itself, which can be written to a file using [fs](https://nodejs.org/api/fs.html).

## Generating JSON from scraping

Once we start scraping more information, we might want to have it stored in a standard format for later use. Let's gather the title, author and price from each book that appears on the home page of our test site:

![books with titles ready for scraping](/basics-scraping-1.png)

The code for that could look like this:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-get-data-json.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-get-data-json.js
:::
::::

The resulting `books.json` file will look like the following:

```json
[
  { "title": "Haben oder haben",
    "author": "Fric Eromm",
    "price": "$9.95"
  },
  {
    "title": "Parry Hotter",
    "author": "J/K Rowlin'",
    "price": "$9.95"
  },
  {
    "title": "Laughterhouse-Five",
    "author": "Truk Tugennov",
    "price": "$9.95"
  },
  {
    "title": "To Mock a Killingbird",
    "author": "Larper Hee",
    "price": "$9.95"
  },
  ...
]
```

All the above examples can be run as follows:

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
node scraping.js
```
:::
::: tab Windows
```sh
node scraping.js
```
:::
::::

## Further reading
1. [Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-pageevalselector-pagefunction-args)'s and [Playwright](https://playwright.dev/#version=v1.2.1&path=docs%2Fapi.md&q=pageevalselector-pagefunction-arg)'s official API reference on the topic
2. An [E2E example test](e2e-coupon/) asserting agains an element's `innerText`
3. An excellent introduction to [scraping with Puppeteer](https://www.toptal.com/puppeteer/headless-browser-puppeteer-tutorial) by Nick Chikovani
4. A practical tutorial on [web scraping with Puppeteer](https://blog.datahut.co/web-scraping-headless-browser-puppeteer/) by Kartik Singh
