---
title: Generating PDFs
date: 2020-11-19
author: Giovanni Rago
githubUser: ragog
tags:
  - pdf
---

Puppeteer and Playwright can be used to create PDFs from webpages. This opens up interesting automation scenarios for tasks such as archiving, generating invoices, writing manuals, books and more.

This article introduces this functionality and shows how we can customise the PDF to fit our needs.

<!-- more -->

## Generating PDFs

After loading a page, we use the `page.pdf` command to convert it to a PDF.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/pdf-minimal.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/pdf-minimal.js
:::
::::

::: tip
We need to pass the `path` option to have the PDF file actually saved to disk.
:::

::: warning
This feature is currently only supported in Chromium headless in both Puppeteer and Playwright.
:::

## Tweaking the result

It is important to take a quick look at the official docs for `page.pdf` ([Puppeteer]((https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagepdfoptions) or [Playwright](https://playwright.dev/#version=v1.6.1&path=docs%2Fapi.md&q=pagepdfoptions), as it is almost certain that we will want to tweak the appearance of our page in the resulting PDF.

In certain cases, our webpage might look significantly different in our PDF compared to our browser. Depending on the case, it can pay off to experiment with the following:

1. We might need to set `printBackground` to true in case graphical components appeart to be missing in the generated PDF.
2. By default, `page.pdf` will generate a PDF with adjusted colors for printing. The CSS property `-webkit-print-color-adjust` will force rendering of the original colors.
3. Calling `page.emulateMedia('screen')` changes the CSS media type of the page.
4. Setting either `width` and `height` or `format` to the appropriate value might be needed for the page to be displayed optimally.

## Customising header and footer

We can also have custom headers and footers added to our pages, displaying values such as title, page number and more.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/pdf-hd.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/pdf-hd.js
:::
::::

The first page of the generated PDF looks as follows:

![generated pdf example](/pdf-generation-hd.png)

::: warning
Chromium sets a default padding for header and footer. You will need to [override it](https://github.com/puppeteer/puppeteer/issues/4132#issuecomment-475110167) in your CSS.</style>
:::

interesting scenario: writing something directly using html+css then outputting pdf

https://playwright.dev/#version=v1.6.1&path=docs%2Fapi.md&q=pagepdfoptions

## Takeaways

## Further reading

1. https://pocketadmin.tech/en/puppeteer-generate-pdf/å
2. A great example of Puppeteer's PDF generation feature: [Li Haoyi](https://twitter.com/li_haoyi)'s [Hands On Scala](https://www.handsonscala.com/index.html) book. See the [build pipeline](https://github.com/handsonscala/build) behind it.
