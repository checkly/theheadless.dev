---
title: Working with selectors
subTitle: Techniques and pointers
date: 2020-06-22
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
---

The way you reference a UI element of your target web application for Puppeteer and Playwright to interact with is through [CSS selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors). Becoming proficient in the usage of such selectors is therefore a requirement for writing quality scripts.

<!-- more -->

## Finding selectors

You can find/generate selectors by:

1. Using your browser's inspector tool (as found e.g. in the [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools/dom)).
2. Leveraging an automated recording tool (e.g. the open-source [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder)).
3. Looking at the source code of the page.

## Choosing selectors

The CSS selectors you ultimately choose to use in your scripts will determine how much maintenance work will go into your Puppeteer/Playwright scripts over the course of their lifetime. Ideally, you want to have robust selectors in place since the inception of the script to save yourself time and effort going forward.

The attributes of a good selector are:

- **Uniqueness**: the goal is to choose something that will identify the target element, and nothing else; [IDs](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Type_Class_and_ID_Selectors#ID_Selectors) are the natural choice, when available.
- **Stability**: choosing an attribute that is not likely to change over time as the page gets updated lowers the chances that you will need to manually update it.
- **Conciseness**: a short selector is easier to read, understand and possibly replace if it finally breaks.

## Examples of bad selectors

Avoid this kind of selector *whenever possible:*

1. `.A8SBwf > .RNNXgb > .SDkEP > .a4bIc > .gLFyf`
    - not concise
    - likely not stable: class names are auto-generated, they could change rapidly
2. `.g:nth-child(3) > .rc`
    - likely not stable: is the third child of .g always going to be present?
    - likely not unique: is it always going to be the right element?
3. `a[data-v-9a19ef14]`
    - not stable: attribute is [auto-generated](https://vue-loader.vuejs.org/guide/scoped-css.html#scoped-css) and changes between deployments
    - likely not unique: is it always going to be the right element?

## Examples of (potentially) good selectors

The following *might*\* be good selectors:

1. `#elementId`
    - concise
    - unique, as long as the page contains [valid HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
    - generally stable
2. `a[data-something=value]`
    - concise
    - unique, as long as `value` is
    - potentially stable, as long as `value` does not change very often
3. `#overlay.close-button`
    - concise
    - unique, as long as only one element has class `.close-button`
    - potentially stable, as long as `.close-button` does not change very often

## Further reading
1. [W3C CSS spec](https://www.w3.org/TR/CSS21/selector.html%23id-selectors) for CSS selectors. 
2. [CSS selector intro](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) from Mozilla.
