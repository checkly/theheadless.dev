/**
 * @name get list of links with javascript
 *
 * @desc Scrapes Hacker News for links on the home page and returns the top 10
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://news.ycombinator.com/news')

  // execute standard javascript in the context of the page.
  const stories = await page.$$eval('a.storylink', anchors => { return anchors.map(anchor => anchor.textContent).slice(0, 10) })
  console.log(stories)

  await browser.close()
})()