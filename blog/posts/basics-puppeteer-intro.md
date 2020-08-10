---
title: What is Puppeteer?
date: 2020-06-19
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

Straight from the [official documentation](https://developers.google.com/web/tools/puppeteer): 

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

Let's break that down:

- *node library*: node.js and javascript are the backbone of most web applications and will be familiar to most developers already
- *high-level API:* a human-readable interface for interacting with webpages through the browser (Chrome or Chromium) using...
- *...the DevTools Protocol:* the standard protocol used to expose Chrome functionality up to various development-oriented tools
- *headless*: running without a graphical user interface.

It is worth noting that Puppeteer is an open-source project maintained by the Chrome DevTools team. Find out how you can [contribute](https://github.com/puppeteer/puppeteer/blob/master/CONTRIBUTING.md) to it!

We now know what Puppeteer is. The next question is "what can we use it for?"

## Main use cases

- **Test automation in modern web applications**: verifying that the features we are exposing our users/customers to are actually behaving as expected.
- **Taking screenshots of web pages**: useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
- **Scraping web sites for data**: extracting data from websites for later retrieval or analysis.
- **Automating interaction of web pages**: speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide we will be looking at all these different use cases, with a focus on test automation / active reliability.

**Considerations on Puppeteer's philosophy and goals:**

- It currently supports mainly Chrome, but also Firefox nightly - support for more browsers might happen in the future. Still, Puppeteer is not a cross-browser testing tool. Its main focus is on Chrome and being fast and powerful.
- As for the Chromium project, the [focus](https://www.chromium.org/developers/core-principles) is on speed, security, stability and simplicity. Expect these four things to be prioritised when a tradeoff is on the horizon.
- Chromium is bundled together with Puppeteer to minimise incompatibilities. This means every Puppeteer version has a specific Chromium version it supports.

## Further reading
1. [Official Puppeteer API documentation](https://pptr.dev/)
2. [Official Puppeteer GitHub repo](https://github.com/puppeteer/puppeteer)

