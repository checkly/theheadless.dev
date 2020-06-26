---
title: Working with selectors
date: 2020-06-22
author: Giovanni Rago
tags: 
  - Puppeteer
---

The way you reference a UI element of your target web application for Puppeteer to interact with is through CSS selectors.

You can pick selectors using

- your browser's inspector tool (as found e.g. in the [Chrome Dev Tools](https://developers.google.com/web/tools/chrome-devtools/dom))
- an automated recording tool (e.g. the open-source [Puppeteer Recorder](https://github.com/checkly/puppeteer-recorder))
- memory, if you are very familiar with the application's source code.

Ultimately, the strategy you adopt in choosing CSS selectors will influence how much maintenance work will go into your Puppeteer scripts over the course of their lifetime. Ideally, you want to have robust selectors in place since the inception of the script to save yourself time and effort going forward.

The attributes of a good selector are:

- **uniqueness**: the goal is to choose something that will identify the target element, and nothing else; IDs are the natural choice, when available
- **stability**: choosing an attribute that is not likely to change over time as the page gets updated lowers the chances that you will need to manually update it;
- **conciseness**: a short selector is easier to read, understand and possibly replace if it finally breaks.

### Examples of bad selectors

Avoid this kind of selector *whenever possible:*

- `.A8SBwf > .RNNXgb > .SDkEP > .a4bIc > .gLFyf`
    - not concise
    - likely not stable: class names are auto-generated, they could change rapidly
- `.g:nth-child(3) > .rc`
    - likely not stable: is the third child of .g always going to be present?
    - likely not unique: is it always going to be the right element?