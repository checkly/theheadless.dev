---
title: Intercepting requests and responses
date: 2020-09-08
author: Giovanni Rago
githubUser: ragog
tags: 
  - mocking
---

When browsing the web, a series of requests and responses are exchanged between our browser and the pages we are visiting. There are scenarios in which it is useful to manipulate this traffic, instead of letting it happen as-is.

1. When [scraping web pages](basics-scraping.md), blocking unnecessary elements from loading in order to speed up the procedure and lower bandwidth usage
2. When we need to isolate software components from their dependencies for testing purposes. This is known as _mocking_.

## Request interception

There are cases when intercepting and modifying outgoing requests can be helpful. For example, when scraping web pages we might want to block unnecessary elements from loading in order to speed up the procedure and lower bandwidth usage.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/request-interception-block.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/request-interception-block.js
:::
::::

## Response interception

Not available in Playwright at the moment.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/response-interception.js
:::
::::

Run the above examples as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
USER_EMAIL=user@email.com USER_PASSWORD=supersecure1 node request-interception-block.js
```
:::
::: tab Windows
```sh
SET USER_EMAIL=user@email.com
SET USER_PASSWORD=supersecure1
node request-interception-block.js
```
:::
::::

## Takeaways

## Further reading
