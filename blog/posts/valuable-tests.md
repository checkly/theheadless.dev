---
title: Keeping tests valuable
subTitle: Principles for sustainable automated testing
date: 2020-07-16
author: Giovanni Rago
githubUser: ragog
tags:
  - e2e
  - testing
---

Headless browsers can be leveraged for testing in a variety of ways, and different scenarios do command different approaches. That being said, there are some general pointers most should follow in order to keep their tests _valuable_.

Here, we define _valuable_ as _sustainably expressing meaningful, truthful information about the state of a system_.
A test that does not reliably fulfill these criteria should be fixed, if possible, or simply removed.

<!-- more -->

## Keep tests short

If they run against a real-world product with a UI that is evolving over time, scripts will need to be regularly updated. This brings up two important points:
1. Most scripts are not write-and-forget, so each script we write is one more script we will have to maintain.
2. Like all cases where code and refactoring are involved, _how_ we write scripts can have a significant influence on how long this maintenance effort takes.

Taking example from good software engineering practices, our scripts should strive for *simplicity, conciseness and readability*:

1. **Simplicity:** keep in mind the goal of the script, and keep away from overly complex solutions whenever possible.
2. **Conciseness:** simply put, do not be overly verbose and keep scripts as short as they can be.
3. **Readability:** follow general [best practices](https://blog.pragmaticengineer.com/readable-code/) around writing code that is easy to read.

The faster we can read and understand a script we (or a teammate) wrote in the past, the quicker we can interpret its results and get to work on updating it and making it relevant again.

::: tip
Do not underestimate the compounding effect of having messy scripts across a large test base.
:::

## Keep tests focused

Automated tests are effective if they:
1. Correctly verify the status of the target functionality.
2. Return within a reasonable amount of time.
3. Produce a result that can be easily interpreted by humans.

The last point is often overlooked. Scripts by themselves have no meaning if their results mean nothing to whoever is looking at them. Ideally, we want the opposite: interpreting a test success or failure should be close to instantaneous and give us a clear understanding of what is working and what is not.

Oftentimes this is impeded by the tendency to have tests do too much. We can draw an example from two scenarios running against our [test site](https://danube-webshop.herokuapp.com/): [E2E Checkout](e2e-checkout/) and [E2E Coupon](e2e-coupon/). While these two have part of their flow in common, and we might be tempted to combine them to avoid a certain degree of duplication, merging them into a single test would obfuscate the meaning of a test failure as we would be testing two different features. If that combined test were to run red, we would be unable to tell whether the entire checkout is not working as expected, or whether users are just unable to redeem coupon codes. Unless we were to devote additional time to diving deep into the failure - which is exactly what we are trying to avoid.

We can avoid this pitfall by making sure our tests are verifying only one feature each.

::: tip
Always check the assertions in your test: if they are spanning more than one feature, you would likely be better off splitting your test into multiple different ones.
:::

## Keep tests independent

In an effort to remove duplication, tests are often made dependent on the previous execution of one or more other tests. An example could be the following sequence of tests:

```
test1:
- creates user1
- asserts user1 has been created

test2:
- logs in with user1
- asserts user1 has logged in successfully

test3:
- goes through checkout as user1
- asserts that checkout for user1 was successful
```

In this case, the success of each subsequent test depends on previous tests as much as on its own assertions. In other words, previous tests are driving a test's success criteria. This form of coupling can create headaches for us in the shape of:
1. **Lower test result readability:** we might need to backtrack and look into previous tests when trying to understand what a subsequent one is doing
2. **Harder maintenance:** changes might need to be applied across different scripts
3. **Lack of flexibility and parallelisation:** tests need to run sequentially in a specific order to work

Having each test encapsulate all it needs to give us a meaningful answer is fundamental to avoid the above issues. In case of our example, a solution could look like:

```
test1:
- creates user1
- asserts user1 has been created

test2:
- (setup: creates user1)
- logs in with user1
- asserts user1 has logged in successfully

test3:
- (setup: creates user1)
- (setup: logs in with user1)
- goes through checkout as user1
- asserts that checkout for user1 was successful
```

Where:
1. Tests can be run in any order, even at the same time.
2. In the interest of code quality, we would be factoring out setup phases in order to easily reuse them across tests. [Jest](https://jestjs.io/docs/en/setup-teardown)'s `beforeEach` and `beforeAll` hooks are examples of useful helper functions that can help us achieve that.

::: tip
If the system you are testing allows it, provision/deprovision your users through APIs in your setup and teardown phases to save time and increase test reliability.
:::

## Takeaways

1. Tests should be reliable and informative in order to be useful.
2. Keep tests short and focused on testing one feature.
3. Keep tests independent to maximise their parallelisation potential and reduce total runtime.

## Further reading
1. [Gergely Orosz](https://blog.pragmaticengineer.com/readable-code/) on writing readable code.
