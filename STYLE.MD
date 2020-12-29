# Style guide

Below are the style requirements for theheadless.dev posts.

## General
- Bridge the gap between abstract recommendation and implementation _whenever possible_

## Post format
- Every post must contain (in this order):
  - Front matter
  - Shortest possible introduction
    - What is the problem?
    - Why does it matter?
    - What will be explored in the post?
  - Bulk  of the article
  - Takeaways (a short summary in 3 or less points)
  - Further reading (links to related resources of interest)
- Keep tips short (2 sentences max)
- Use numbered lists instead of unordered
- Stay consistend with header format. The post title is rendered automatically as `h1`. The subsections should be h2, i.e. `## subsection-title`. They will show in the right hand table of contents.
- Use code block line highlights only in non-example posts, and only when they add in clarity.

## Front matter
- In title, capitalise only first letter + names
- Front matter needs to follow format, e.g.:

    ```
    ---
    title: Microsoft Live login
    date: 2020-06-22
    author: Tim Nolet
    githubUser: tnolet
    tags: 
    - e2e
    - login
    ---
    ```

### Tags
- All lower case
- Tag examples with relevant basic functionality article (e.g. tag "file upload" goes into both the basic File Upload article and E2E Account Settings, which contains a profile pic upload)
- Avoid very generic tags, e.g. 'best practices'

## Code style
- (Eslint should automatically take care of smaller items, like semicolons at the end of each instruciton, on commit)
- No code spillout (max 80 char column) whenever possible
- Use tabbed component, even if code is the same for Puppeteer and Playwright