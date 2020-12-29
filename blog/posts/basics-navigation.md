---
title: Navigating & waiting
subTitle: How to ensure elements are ready for interaction
date: 2020-06-15
author: Tim Nolet
githubUser: tnolet
tags:
  - basics
---

Every useful script that we will write will almost certainly do three key things:
1. Navigating to some web page
2. Waiting for something
3. Possibly getting a timeout 😐

Both frameworks handle these scenarios in very similar ways but Playwright explicitly differentiates itself from Puppeteer
by having a "built in" waiting mechanism that covers a lot of common scenarios.

<!-- more -->

## Navigating

Initial navigation to any page is pretty much the same for both frameworks and can happen in multiple ways.

- Whenever your code does a `page.goto()`, or a `page.click()` on a link, you explicitly trigger a navigation.
- The webpage you are on can also trigger a navigation by executing `location.href= 'https://example.com'` or using the
`history.pushState()` API.

In the example below we trigger two navigations:

1. The initial load of the page.
2. A navigation to the shopping cart by clicking a link

<!-- more -->

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-browser-navigation.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-browser-navigation.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
node basic-browser-navigation.js
```
:::
::: tab Windows
```sh
node basic-browser-navigation.js
```
:::
::::

We also add `await browser.close()` to ensure that we are shutting down our browser before terminating the session.
Without it, our execution would not return after the page has loaded, keeping our test hanging indefinitely.

## Waiting

In your code, you have a range of options to wait for different things to happen in your browser session. There are a couple
that are very important:

**page.waitForSelector()**

This method waits for an element to appear in the page. This is your bread and butter and should be used whenever something
needs to be loaded after clicking, hovering, navigating etc. You can pass it an object with a `timeout` attribute
to override the default 30 seconds.

In the example below, we type an email address into an input field on a login modal. Notice the difference between
the Puppeteer and Playwright example.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/basic-browser-waiting.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-browser-waiting.js
:::
::::

Run this example as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
node basic-browser-waiting.js
```
:::
::: tab Windows
```shell script
node basic-browser-waiting.js
```
:::
::::


This works exactly the same for the `page.waitForXpath()` function is you are using XPath selectors instead of CSS selectors.

**page.waitForNavigation()**

In your scripts you can click on a link that triggers a navigation to a new page. You can use Puppeteer's `page.waitForNavigation()`
method here to explicitly wait for this event to happen and then continue your script. The accepted notation in Puppeteer's
case is by using the `Promise.all()` method to wait for the click to happen and the navigation to happen before continuing.

```js
const [response] = await Promise.all([
  page.waitForNavigation(),
  page.click('a.some-link')
]);
```

Interestingly, Playwright offers pretty much the same API for waiting on events and elements but again stresses its automatic handling
of the wait states under the hood.

::: tip
Playwright handles a lot of the common waiting scenario's using its built-in "auto waiting". Depending on your use case, it
might serve all your needs
:::


## Timeouts

The `page.waitForNavigation()` method — but also similar methods like `page.reload()` and `page.goBack()` — all take some
options that determine "how" it should wait and what the timeout limits are.

These options come in two flavours:

**1. Hard timeout**

The time in milliseconds passed as the `timeout` property, e.g. `page.waitForNavigation({ timeout: 2000 })`. We do not recommend
using this if you do not explicitly need to.

**2a. DOM event based**

These two options are directly related to the events your browser emits when it has reached a certain loading stage.
These events are not specific to Puppeteer and are used in almost all browsers.

- `load`: This is the default and very strict: your whole page including all dependent resources, i.e. images, scripts, css etc.
- `domcontentloaded`: less strict: when your HTML has loaded.

Note: the load option is the default.

**2b. Heuristic based**

These two options are based on the heuristic that if (almost) all network connections your browser has are no longer active,
your page has probably finished loading.

- `networkidle0`: consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.
- `networkidle2`: consider navigation to be finished when there are no more than 2 network connections for at least 500 ms.

Playwright has done away with the distinction between `networkidle0` and `networkidle2` and just has:

- `networkidle`: consider navigation to be finished when there are no more than 0 network connections for at least 500 ms.

Both options 2a and 2b are passed using the `waitUntil` property, e.g. `page.waitForNavigation({ waitUntil: 'networkidle2' })`

Which of these options is useful to you depends on your situation:

- Does your SPA need to be fully rendered and finish all XHR calls? Go with `load`
- You server render and load in some non-crucial element in a lazy fashion? go for one of the `networkidle` variant.


Now that we know how to start a browser and navigate to a URL, the clear next step is to learn how to [interact with a webpage](basics-clicking-typing/).

## Further reading
1. [Playwright general navigation docs](https://playwright.dev/#version=v1.3.0&path=docs%2Floading.md&q=)
2. [Puppeteer page.goto() docs](https://pptr.dev/#?product=Puppeteer&version=v5.2.1&show=api-pagegotourl-options)
3. [Playwright auto waiting](https://playwright.dev/#version=v1.3.0&path=docs%2Fcore-concepts.md&q=auto-waiting)
