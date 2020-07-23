---
title: E2E Signup
date: 2020-06-30
author: Giovanni Rago
githubUser: ragog
tags: 
  - E2E
  - Signup
---

Signups are key transactions in most web platforms, and therefore prime targets for automation.

Oftentimes, registering an account is where we will find longer forms asking the user to answer a variety of questions. Luckily, Puppeteer and Playwright are quick enough to blaze through these in seconds or even less.

The flow will often match the following:

1. Navigate to the signup form
2. Fill in all text fields, check all boxes etc.
3. Submit the form by clicking a button

We will likely want to also check that some change occurred in the UI to confirm that the registration worked.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/signup.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/signup.js
:::
::::

Run this example as follows. Replace the username and password placeholder with your own credentials.

:::: tabs :options="{ useUrlFragment: false }"
::: tab MacOS
```shell script
USER_EMAIL=username USER_PASSWORD=password node signup.js
```
:::
::: tab Windows
```shell script
SET USER_EMAIL=username
SET USER_PASSWORD=password
node signup.js
```
:::
::::

The normal signup flow might include asking the user to confirm their email address right away by navigating to a URL included in an automated email. Reliably replicating the steps needed to achieve that is not trivial. A possible solution to the issue is having the system under test distinguish between test sessions and normal user sessions, and skip the verification step for test sessions. A way to achieve this would be to check for a specific user agent ID which could be set as part of our test:

```js
await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 TEST_ID/<MY_SECRET>');
```

## Confirmation emails, bot detection and automation hardening
Some flows are made hard to automate on purpose to defend against malicious actors. Some examples:
1. New user signup (see example immediately above for a possible solution)
2. Social login through providers like Google, Facebook etc.
3. 'Forgot password' and similar reset scenarios

In general, 

## Takeaways
1. Use environment variables to inject secrets.
2. You might need to go through additional steps in case email confirmation or similar is required.