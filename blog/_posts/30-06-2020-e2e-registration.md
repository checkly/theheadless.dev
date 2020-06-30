---
title: E2E Registration
date: 2020-06-30
author: Giovanni Rago
tags: 
  - Puppeteer
  - Playwright
  - E2E
  - Registration
---

Since signups are key transactions in most web platforms, user registration scenarios are prime targets for automation.

Oftentimes, registration is where we will find longer forms asking the user to answer a variety of questions. Luckily, Puppeteer and Playwright are quick enough to blaze through these in seconds or even less.

The flow will often match the following:

0. Navigate to the signup form
1. Fill in all text fields, check all boxes etc.
2. Submit the form by clicking a button

We will likely want to also check that some change occurred in the UI to confirm that the registration worked.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/registration.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/registration.js
:::
::::

Run this example as follows. Replace the username and password placeholder with your own credentials.

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
USER_EMAIL=username USER_PASSWORD=password node registration.js
```
:::
::: tab Windows
```shell script
SET USER_EMAIL=username
SET USER_PASSWORD=password
node registration.js
```
:::
::::

Potentially, we might be asked to confirm our email address right away by navigating to a URL included in an automated email. There are multiple solutions to this, like adding exceptions for this specific user beforehand or leveraging a REST API to activate the account during the test execution. See our [Best Practices](#) section for more information.

# Takeaways

- Use environment variables to inject secrets.
- You might need to wait for the navigation as you are redirected to the registration screen/modal.
- You might need to go through additional steps in case email confirmation or similar is required.