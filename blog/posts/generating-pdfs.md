---
title: Generating PDFs
subTitle: Creating invoices, books and more from a web page
date: 2020-11-19
author: Giovanni Rago
githubUser: ragog
tags:
  - pdf
---

Puppeteer and Playwright can be used to create PDFs from webpages. This opens up interesting automation scenarios for tasks such as archiving, generating invoices, writing manuals, books and more.

This article introduces this functionality and shows how we can customise the PDF to fit our needs.

<!-- more -->

## Generating a PDF file

After loading a page, we use the `page.pdf()` command to convert it to a PDF.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/pdf-minimal.js{7}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/pdf-minimal.js{7}
:::
::::

Note that we need to pass the `path` option to have the PDF file actually saved to disk.

::: warning
This feature is currently only supported in Chromium headless in both Puppeteer and Playwright.
:::

## Tweaking the result

It is important to take a quick look at the official docs for `page.pdf()` ([Puppeteer](https://pptr.dev/#?product=Puppeteer&version=v5.3.1&show=api-pagepdfoptions) or [Playwright](https://playwright.dev/#version=v1.6.1&path=docs%2Fapi.md&q=pagepdfoptions)), as it is almost certain that we will want to tweak the appearance of our page in the resulting PDF.

In certain cases, our webpage might look significantly different in our PDF compared to our browser. Depending on the case, it can pay off to experiment with the following:

1. We might need to set option `printBackground` to true in case graphical components appear to be missing in the generated PDF.
2. By default, `page.pdf()` will generate a PDF with adjusted colors for printing. Setting the CSS property `-webkit-print-color-adjust: exact` will force rendering of the original colors.
3. Calling `page.emulateMedia('screen')` changes the CSS media type of the page.
4. Setting either `width` and `height` or `format` to the appropriate value might be needed for the page to be displayed optimally.

## Customising header and footer

We can also have custom headers and footers added to our pages, displaying values such as title, page number and more. Let's see how this looks on your [favourite website](https://theheadless.dev):

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/pdf-hd.js{10-11,13,23-33}
:::
::: tab Playwright
<<< @/blog/snippets/playwright/pdf-hd.js{10-11,21-31}
:::
::::

We are including the following template files for our header...

```html
<html>
  <head>
    <style type="text/css">
      #header {
        padding: 0;
      }
      .content {
        width: 100%;
        background-color: #777;
        color: white;
        padding: 5px;
        -webkit-print-color-adjust: exact;
        vertical-align: middle;
        font-size: 15px;
        margin-top: 0;
        display: inline-block;
      }
      .title {
        font-weight: bold;
      }
      .date {
        text-align:right;
      }
    </style>
  </head>
  <body>
    <div class="content">
        <span class="title"></span> -
        <span class="date"></span>
        <span class="url"></div>
    </div>
  </body>
</html>
```

...and footer:

```html
<html>
  <head>
    <style type="text/css">
      #footer {
        padding: 0;
      }
      .content-footer {
        width: 100%;
        background-color: #777;
        color: white;
        padding: 5px;
        -webkit-print-color-adjust: exact;
        vertical-align: middle;
        font-size: 15px;
        margin-top: 0;
        display: inline-block;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="content-footer">
      Page <span class="pageNumber"></span> of <span class="totalPages"></span>
    </div>
  </body>
</html>
```

The first page of the generated PDF looks as follows:

![generated pdf example](/pdf-generation-hd.png)

::: tip
Chromium sets a default padding for header and footer. You will need to [override it](https://github.com/puppeteer/puppeteer/issues/4132#issuecomment-475110167) in your CSS.</style>
:::

Run the above examples as follows:
:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```sh
node generate-pdf.js
```
:::
::: tab Windows
```sh
node generate-pdf.js
```
:::
::::

## Further considerations

We can easily transform existing web pages into PDF format, just as we have shown in our example. An even more interesting use case is about generating a brand new document: now we can use our existing HTML and CSS skills to produce high-quality PDFs, often eliminating the need for LaTeX or similar tools.

See points 2 and 3 of the following section for practical examples of this approach.

## Further reading

1. Pocket Admin's article on [generating PDF from HTML](https://pocketadmin.tech/en/puppeteer-generate-pdf/).
2. Florian Mößle's guide to [generating invoices with Puppeteer](https://medium.com/@fmoessle/use-html-and-puppeteer-to-create-pdfs-in-node-js-566dbaf9d9ca)
3. A great example of Puppeteer's PDF generation feature: [Li Haoyi](https://twitter.com/li_haoyi)'s [Hands On Scala](https://www.handsonscala.com/index.html) book. See the [build pipeline](https://github.com/handsonscala/build) behind it.
