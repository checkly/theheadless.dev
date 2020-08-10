---
title: E2E Checkout
date: 2020-07-02
author: Giovanni Rago
githubUser: ragog
tags: 
  - E2E
---

Another key website flow that needs to be closely monitored is any sort of checkout. You want to be 100% sure your users are able to pay for goods or services you might be offering, at any given time.

## Steps

Checkout procedures can vary dramatically depending on what is being bought or sold. A few constants will be:
* a shopping basket page / section, in cases where multiple items can be bought - this is normally where the checkout procedure starts
* a page to enter or edit billing and, where applicable, shipping information
* a summary to review all the different parameters of the purchase

Modelled on the above structure is the following example running against our test website. We will add a few products to the shopping cart, then proceed until the summary screen shows up and verify that the transaction has been confirmed. Here we can get creative and, for example, iterate through a number of products to fill the cart:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/checkout.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/checkout.js
:::
::::

Run this example as follows:

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
PRODUCTS_NUMBER=3 node checkout.js
```
:::
::: tab Windows
```shell script
SET PRODUCTS_NUMBER=3
node checkout.js
```
:::
::::

Note: In some cases, users will need to [log in](/2020/06/25/_25-06-2020-e2e-login) before they can proceed to a purchase. When users are allowed to buy both with and without having a pre-existing account on the platform, it might be worthwhile to test both flows separately.

## Limitations

Checkout is a peculiar flow: unlike Login and others, it almost always involves an actual exchange of currency. This is usually not an issue in pre-production environments, as payment providers are not yet involved or are set up in sandbox/test mode. For Production, low-value transactions can be performed with low frequency and immediately voided after the test has been completed.

## Takeaways
- Checkout flows will vary depending on what is being purchased.
- Remember to check different flows (e.g. with and without login) if needed.
- Additional care is needed on production systems as real transactions will take place.
