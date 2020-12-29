---
title: What is Puppeteer?
date: 2020-06-19
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
---

Straight from the [official documentation](https://developers.google.com/web/tools/puppeteer): 

> Puppeteer is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Puppeteer runs headless by default, but can be configured to run full (non-headless) Chrome or Chromium.

Let's break that down:

<!-- more -->

1. **node library**: Node.js and Javascript are the backbone of most web applications and will be familiar to most developers already
2. **high-level API:** a human-readable interface for interacting with webpages through the browser (Chrome or Chromium) using...
3. **...the DevTools Protocol:** the standard protocol used to expose Chrome functionality up to various development-oriented tools
4. **headless**: running without a graphical user interface.

It is worth noting that Puppeteer is an open-source project maintained by the Chrome DevTools team. Find out how you can [contribute](https://github.com/puppeteer/puppeteer/blob/master/CONTRIBUTING.md) to it!

## Main use cases

We now know what Puppeteer is. The next question is "what can we use it for?"

1. **Test automation in modern web applications**: verifying that the features we are exposing our users/customers to are actually behaving as expected.
2. **Taking screenshots of web pages**: useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
3. **Scraping web sites for data**: extracting data from websites for later retrieval or analysis.
4. **Automating interaction of web pages**: speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide we will be looking at all these different use cases.

## Philosophy and goals ##

1. It currently supports mainly Chrome, but also Firefox nightly - support for more browsers might happen in the future. Still, Puppeteer is not a cross-browser testing tool. Its main focus is on Chrome and being fast and powerful.
2. Like for the Chromium project, the focus is on [speed, security, stability and simplicity](https://www.chromium.org/developers/core-principles). Expect these four things to be prioritised when a tradeoff is on the horizon.
3. Chromium is bundled together with Puppeteer to minimise incompatibilities. This means every Puppeteer version has a [specific Chromium version](https://github.com/puppeteer/puppeteer/releases) it supports.

## Further reading
1. [Official Puppeteer API documentation](https://pptr.dev/)
2. [Official Puppeteer GitHub repo](https://github.com/puppeteer/puppeteer)
3. Nitay Neeman's [Getting to Know Puppeteer Using Practical Examples](https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/)

