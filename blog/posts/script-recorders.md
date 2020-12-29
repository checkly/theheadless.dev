---
title: Using script recorders
subTitle: Generating scripts for beginners and pros
date: 2020-09-16
author: Hannes Lenke
githubUser: hlenke
tags:
  - script generation
---

With Puppeteer and Playwright, writing scripts by hand is not the only option. Since browser automation first became possible, there have always been tools trying to simplify script creation. Such instruments normally aim to help users with little or no scripting skills use automation tools, while also saving more expert users time when creating brand new scripts.

Recorders can be used to quickly generate code for a scenario, saving time users would otherwise have to spend inspecting the various pages to find valid selectors. When creating multiple scripts, this adds up to a noticeable amount of time saved.

<!-- more -->

## Extensions vs libraries

In the world of headless automation, most open-source recorders are available in one of two formats:

1. As extensions to be installed and run from your browser, e.g. [Headless Recorder](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda?hl=en-GB)
![headless recorder screenshot](/recorder-headless.png)

2. As libraries which launch a new browser session, e.g. [QAWolf](https://www.qawolf.com/)
![qawolf screenshot](/recorder-qawolf.png)

Both types will record different input events and generate the corresponding code line-by-line.

## Using recorders effectively

Regardless of the approach you choose, you will want to inspect the output scripts to make sure they are doing what you need them to in the fastest and most reliable way possible. In the interest of efficiency, it is recommended that you choose a recorder that outputs scripts that do not require too much tweaking.

That being said, you should always double-check the newly created scripts and tweak it when necessary, especially keeping an eye out for:

1. Selectors, which should be in line with common [best practices](basics-selectors/).
2. [Waits](basics-navigation/), which should ensure the right element is present and/or ready for interaction at the right time; also, make sure you get rid of unnecessary waits.
3. Any sort of needless duplication.

An example of recorded Puppeteer script:

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/recorder-rough.js
:::
::::

We can modify this script to improve readability and efficiency:

1. The duplicated `await navigationPromise` on line 14 serves no purpose and can be deleted.
2. The `page.waitForSelector` on line 16 is not needed as we already are waiting on the navigationPromise.
3. The `page.waitForSelector` on line 19 can be skipped as the element is present on the same page as the previous one.
4. All the selectors used can be [refactored](basics-selectors/).

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer
<<< @/blog/snippets/puppeteer/recorder-refactored.js
:::
::::

Like all scripts, recorded scripts need to be maintained in order to [remain useful](valuable-tests/) over time.

## Takeaways

1. Recorders are a powerful tool to speed up script creation.
2. Recorded scripts should always be inspected and possibly tweaked to ensure correctness and efficiency.
3. Script maintenance is still required after scripts have been recorded.

## Further reading

1. [Headless Recorder](https://github.com/checkly/headless-recorder) and [QAWolf's](https://github.com/qawolf/qawolf) GitHub repositories.
2. [Playwright CLI](https://github.com/microsoft/playwright-cli) also enables script recording.
