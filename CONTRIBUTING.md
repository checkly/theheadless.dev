# Contributing to theheadless.dev

Thanks contributing to The Headless Dev!

- [Reporting an Issue](#reporting-issues) - how to report typo's, bugs and other issues.
- [Contributing Content](#contributing-content) - how to contribute an article
- [Editorial Workflow](#editorial-workflow) - how we review and edit your contribution

## Reporting Issues

If you have found a spelling mistake, missing info, or anything that you feel is an issue that should be reported,
[please create a new issue here on GitHub](https://github.com/checkly/theheadless.dev/issues/new).

## Contributing a guide or article

We welcome new articles on a range of topics surrounding headless browser frameworks and more specifically Puppeteer and Playwright.
Articles should cover any topic related to practical, day-to-day usage of these frameworks. Here are our guidelines

- Submit articles with a PR on the [theheadless.dev repo](https://github.com/checkly/theheadless.dev)
- Write articles in markdown and can use the [Markdown extensions provided by Vue press](https://vuepress.vuejs.org/guide/markdown.html)
- Add articles to the `posts` directory as markdown files
- Add code examples to the `snippet` directory as Javascript files and inserted into markdown code blocks using the `<< @snippet` syntax
- Code examples should cover both Puppeteer and Playwright where applicable
- Add your full name and GitHub username in the relevant `author` and `githubUser` front matter

You can find additional styling guidelines in this [dedicated file](https://github.com/checkly/theheadless.dev/blob/master/STYLE.MD). Our team will gladly help you apply these after the initial review.

## Editorial workflow

The maintainers of this repo will review your contribution. During a review we will check for:

- Relevance: is this topic interesting? Did we already cover it?
- Writing: any typos? Any flow errors? Is the reading understandable?
- Correctness: are the examples and code correct?

The maintainer reserve the right to not merge your PR if we find it does not meet the standards we like to set for the community.
We will work with you, provide feedback and learn together: but we still might not merge.

## Contribution- & local development workflow

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `npm install`
5. Run `npm run dev` to build and watch for code changes
6. Pull requests should be made against `master`.
