---
title: Setting up Puppeteer locally
date: 2020-06-20
author: Giovanni
tags: 
  - Puppeteer
---

Let's start by creating the folder where we will be storing our scripts going forward.

`mkdir learning-puppeteer && cd $_`

Assuming you already have [node.js](https://nodejs.org/) available in your local environment, installing Puppeteer is achieved with just one instruction:

`npm i puppeteer`

Puppeteer comes bundled with Chrome, so we now have all we need to run our first script. Let's create a new file...

`touch hello-world.js`

...and write a script to navigate to [https://example.com](https://example.com):

```jsx
/* hello-world.js */

const puppeteer = require('puppeteer'); // import puppeteer

(async () => {
  const browser = await puppeteer.launch(); // launch puppeteer
  const page = await browser.newPage(); // get a page object
  await page.goto('https://example.com'); // navigate to https://example.com

  await browser.close(); // close the browser
})();
```

After saving the file, let's run the script:

`node hello-world.js`

Nothing much has happened, right? Remember: by default, Puppeteer will run in headless mode! That means we won't see anything of what is happening in the browser when our script runs.

> **Did you know?** Puppeteer creates its own browser user profile, which it cleans up on every run. In other words: all runs will be sandboxed and not interfere with one another, as state is always fully reset at the end of a session.

When you are first writing and debugging your scripts, it is a good idea to disable headless mode so you can have a look at what Puppeteer is doing:

```jsx
...
const browser = await puppeteer.launch({headless: false});
...
```

After executing the updated file, you will see Chromium starting up, only to shut down after an instant. Everything is working as expected! Our script is just very short - at Puppeteer's speed, it is almost instantaneous to run it.