---
title: Measuring page performance
date: 2020-09-29
author: Giovanni Rago
githubUser: ragog
tags: 
  - basics
  - performance
---

In the last few years, as web applications increased in [complexity and size](https://httparchive.org/reports/page-weight), the topic of performance has become more and more prominent. Its importance has been compounded by the fact that web access has largely shifted away from faster and better connected desktop machines to less powerful, slower mobile devices.

## Why performance matters

We must keep in mind that it is the end-user's own perception that ultimately determines what we call User Experience. The time it takes for a service to become usable, as well as its general responsiveness, bear a lot of weight on this perception. Helpful features, great design and other awesome characteristics all become irrelevant when an online service is so slow that users navigate away. 

You can build the best web application in the world, but be mindful that each user will have a specific amount of time they are willing to invest in your service to solve their problems. Go over that amount, and you risk losing them to a different, more performant solution. This is likely even truer for new users, who haven't yet been given proof of the quality of your service, and are essentially investing their time up-front, hoping for a return.

### A competitive differentiator

There is a brighter side to the topic: if low performance can sink an online platform, high performance can very well help it rise to the top. Speed and responsiveness can be a differentiating characteristic for a service, prompting users to choose it over the competition. Therefore an investment in this area will often pay off. Some notorious real-world examples from known businesses include:

1. Pinterest decreasing wait time for their users, [increasing both traffic and conversions](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7).
2. Zalando applying small improvements in load time and fiding direct correlation with [increased revenue per session](https://engineering.zalando.com/posts/2018/06/loading-time-matters.html).
3. The BBC finding out that every extra second that a page took to load led to 10% of [users leaving the page](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale).

## Measuring performance

Given the importance of page performance, it is no coincidence that browsers expose a ton of insights into [performance metrics](https://web.dev/metrics/). Being aware of how your application scores against these _across time_ will provide you the feedback you need to keep it performant for your users. There are several approaches that can be combined to achieve the best results:

1. _Real user monitoring_ to understand what performance actual end-users of your service are experiencing.
2. _Synthetic monitoring_ to proactively gather intel on service performance, as well as to find issues before users stumble into them.
3. _Performance testing_ to avoid releasing performance regression to production.
4. _Regular audits_ to get an overview of your page's performance and suggestions on how to improve it, e.g. with tools such as [Google Lighthouse](https://developers.google.com/web/tools/lighthouse).

## Performance with headless tools

As much as we should be striving to build performant applications, we should commit to monitoring and testing performance to enable continuous feedback and rapid intervention in case of degradation. Puppeteer and Playwright give us a great toolkit to address both synthetic monitoring and performance testing.

1. Access to the Web Performance APIs, especially [`PerformanceNavigationTiming`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) and [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming).
2. Whenever testing against Chromium, access to the Chrome DevTools protocol for traffic inspection, network emulation and more.
3. Easy interoperability with performance libraries from the Node.js ecosystem.

### Web Performance APIs

The [Navigation Timing](https://www.w3.org/TR/navigation-timing/) and the [Resource Timing](https://www.w3.org/TR/resource-timing-1/) performance APIs are [W3C](https://www.w3.org/) specifications. The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/Performance/Navigation_and_resource_timings) very clearly define the scope of both:

> Navigation timings are metrics measuring a browser's document navigation events. Resource timings are detailed network timing measurements regarding the loading of an application's resources. Both provide the same read-only properties, but navigation timing measures the main document's timings whereas the resource timing provides the times for all the assets or resources called in by that main document and the resources' requested resources.

We can use the Navigation Timing API to retrieve timestamps of key events in the page load timeline. 

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-performance-navigation.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-performance-navigation.js
:::
::::

The Resource Timing API allows us to zoom in to single resources and get accurate information about how quickly they are being loaded.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-performance-resource.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-performance-resource.js
:::
::::

### Chrome DevTools for performance

The Chrome DevTools protocol offers many great performance tools for us to leverage together with Puppeteer and Playwright.

(example 1: HAR file retrieval)

(example 2: network emulation)

### Additional performance libraries

Lighthouse can easily be used programmatically with Playwright and Puppeteer to gather metric values and scores.

:::: tabs :options="{ useUrlFragment: false }"
::: tab Puppeteer 
<<< @/blog/snippets/puppeteer/basic-performance-lighthouse.js
:::
::: tab Playwright
<<< @/blog/snippets/playwright/basic-performance-lighthouse.js
:::
::::

## Further reading
1. [MDN Web Performance docs](https://developer.mozilla.org/en-US/docs/Web/Performance)
2. [Get Started with Google Lighthouse](https://developers.google.com/web/tools/lighthouse#get-started)
3. [Web Performance Recipes With Puppeteer](https://addyosmani.com/blog/puppeteer-recipes/) by Addy Osmani
https://fdalvi.github.io/blog/2018-02-05-puppeteer-network-throttle/
https://developer.mozilla.org/en-US/docs/Learn/Performance
https://michaljanaszek.com/blog/test-website-performance-with-puppeteer/#navigationTimingAPI