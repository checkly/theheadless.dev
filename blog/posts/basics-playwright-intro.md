---
title: What is Playwright?
date: 2020-06-29
author: Giovanni Rago
githubUser: ragog
tags:
  - basics
---

The [official documentation](https://playwright.dev/) for Playwright reads:

> Playwright provides a set of APIs to automate Chromium, Firefox and WebKit browsers. By using the Playwright API, you can write JavaScript code to create new browser pages, navigate to URLs and then interact with elements on a page.

The resemblance to Google's [Puppeteer](basics-puppeteer-intro/) is striking, and for good reason. 

<!-- more -->

## Puppeteer vs Playwright
In the words of the authors:

> We are the same team that originally built Puppeteer at Google [...]. With Playwright, we'd like to take it one step further and offer the same functionality for *all* the popular rendering engines. We'd like to see Playwright vendor-neutral and shared governed.

In short, Playwright builds on the experience of Puppeteer to provide a way to:
1. run against all major browsers (Chromium/Chrome, Firefox, WebKit/Safari)
2. write more concise scripts (e.g. minimising the need for explicit waits)
3. easily migrate existing codebases (keeping a very similar API)

This is achieved in the form of a compact node library that exposes a high-level API to interact with web pages in a fast, secure, stable and simple way. As it is an open-source project, you can [contribute](https://github.com/microsoft/playwright/blob/master/CONTRIBUTING.md) to it yourself.

## Main use cases
1. **Test automation in modern web applications:** verifying that the features we are exposing our users/customers to are actually behaving as expected.
2. **Cross-browser testing:** ensuring applications are working consistently across browsers and rendering engines.
3. **Taking screenshots of web pages:** useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
4. **Scraping web sites for data:** extracting data from websites for later retrieval or analysis.
5. **Automating interaction of web pages:** speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide you will find multiple examples showing how to leverage Playwright, with a focus on test automation / active reliability.

## Further reading
1. [Official Playwright API documentation](https://playwright.dev/)
2. [Official Playwright GitHub repo](https://github.com/microsoft/playwright)
