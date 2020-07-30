/**
 * @name get text value of an element
 *
 * @desc Gets the text value of an element by using the page.$eval method
 *
 */
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://news.ycombinator.com/news')
  const name = await page.$eval('.hnname > a', el => el.innerText)
  console.log(name)
  await browser.close()
})()