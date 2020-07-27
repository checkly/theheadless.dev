---
title: Challenging automation flows
date: 2020-07-23
author: Giovanni Rago
githubUser: ragog
tags: 
  - Basics
---

While automation tools are fundamental to modern software development, they also have the innate potential to be used for malicious purposes. This applies to Puppeteer and Playwright, too.

As a consequence, some flows are made hard to automate on purpose to defend against malicious actors. Some examples:
1. New user signup
2. Social login through providers like Google, Facebook etc.
3. 'Forgot password' and similar reset scenarios

There are several means through which automation is made more difficult.

## Captchas
Captchas are a popular measure many websites take in order to counter automation for sensitive user flows, with Google's ubiquitous [reCAPTCHA](https://www.google.com/recaptcha/intro/v3.html) being the most known example. Captchas work by challenging users with tasks that are trivial for humans and hard for bots, like finding elements in an image or reading obfuscated strings of text.

It is beyond the point of a test to try and solve a captcha: we are not trying to verify that the captcha itself works, rather to get past the captcha so we can test the functionality of our target platform. Also, if we were able to automatically solve a captcha, that would defeat the whole purpose of having one.

For pre-production environments, we can:
1. [Set captcha to always pass](https://developers.google.com/recaptcha/docs/faq#id-like-to-run-automated-tests-with-recaptcha.-what-should-i-do)
2. Have captchas removed

## Bot detection
Certain platforms might have built-in mechanisms to tell manual and automated traffic apart, with the goal of shutting down the latter. These could be based on traffic volume analysis, HTTP fingerprinting, IP blacklisting or even on user behaviour analysis (e.g. the way the user moves the mouse cursor). Headless browsers will normally identify themselves as such in their User-Agent request headers, making detection trivial:

```Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/79.0.3945.0 Safari 537.36```

Bot detection could be deactivated for pre-production environments in order to allow automation. For production environments, a secret may be included in the User-Agent (or similar mechanism) to let selected bots through for testing purposes.

## Automation-resistant UIs
Certain industries are particularly affected by malicious automation attempts, especially where high-volume automation offers an unfair advantage. Examples of this include online betting and gaming.

In these cases, UI automation is specifically made more difficult by utilising components that are harder to interact with, and in some cases by randomising attribute values for key elements in order to prevent referencing. Even if this measure does not defeat all attempts, it can make it excruciatingly hard to produce reliable automated scripts, which might be enough to discourage a large number of attackers.