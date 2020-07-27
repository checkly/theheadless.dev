---
title: What is Playwright?
date: 2020-06-29
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

The [official documentation](https://playwright.dev/) for Playwright reads: 

> Playwright provides a set of APIs to automate Chromium, Firefox and WebKit browsers. By using the Playwright API, you can write JavaScript code to create new browser pages, navigate to URLs and then interact with elements on a page.

The resemblance to Google's [Puppeteer](https://guides.checklyhq.com/2020/06/19/_19-06-2020-puppeteer-intro/) is striking, and for good reason. 

### Puppeteer vs Playwright
In the words of the authors:

> We are the same team that originally built Puppeteer at Google, but has since then moved on. Puppeteer proved that there is a lot of interest in the new generation of ever-green, capable and reliable automation drivers. With Playwright, we'd like to take it one step further and offer the same functionality for **all** the popular rendering engines. We'd like to see Playwright vendor-neutral and shared governed.

In short, Playwright builds on the experience of Puppeteer to provide a way to:
* run against all major browsers (Chromium/Chrome, Firefox, WebKit/Safari)
* write more concise scripts (e.g. minimising the need for explicit waits)
* easily migrate existing codebases (keeping a very similar API)

This is achieved in the form of a compact node library that exposes a high-level API to interact with web pages in a fast, secure, stable and simple way. As it is an open-source project, you can [contribute](https://github.com/microsoft/playwright/blob/master/CONTRIBUTING.md) to it yourself.

## Main use cases:
- **Test automation in modern web applications:** verifying that the features we are exposing our users/customers to are actually behaving as expected.
- **Cross-browser testing:** ensuring applications are working consistently across browsers and rendering engines.
- **Taking screenshots of web pages:** useful for a variety of different uses going from simple archiving to automated comparison for e.g. visual testing.
- **Scraping web sites for data:** extracting data from websites for later retrieval or analysis.
- **Automating interaction of web pages:** speed up and scale any sort of sequence of actions we would like to perform on a website automatically.

In this guide you will find multiple examples showing how to leverage Playwright, with a focus on test automation / active reliability.