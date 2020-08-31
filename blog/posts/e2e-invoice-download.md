---
title: E2E Invoice Download
date: 2020-08-31
author: Giovanni Rago
githubUser: ragog
tags: 
  - e2e
  - file download
---

Websites might expose files for users to download and then access from their local machine. Common cases are downloading tickets, receipts and itineraries.

## Steps

This example runs against our [test webshop](https://danube-webshop.herokuapp.com/) and proceeds to download a receipt for a previous purchase. It includes the following steps:

1. Logging in to the website
2. Navigating to the account page
3. Downloading a linked file

We will check that the downloaded file is as expected by comparing it to a [fixture file](test-data-intro.md) in our final assertion.

We can approach this scenario in different ways. One possibility is to perform the first two steps, then [extract](basics-scraping.md) the `href` value and use it to retrieve the file with a `GET` request (performed with [axios](https://github.com/axios/axios), for example).

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/file-download.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/file-download.js
:::
::::

We could also click the link directly and wait for the download event, then proceed with the comparison. Waiting for the download event is currently not supported by Puppeteer.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Playwright
<<< @/blog/snippets/playwright/file-download-alt.js
:::
::::

Both examples can be run as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 node file-download.js
```
:::
::: tab Windows
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
node file-download.js
```
:::
::::

## Takeaways