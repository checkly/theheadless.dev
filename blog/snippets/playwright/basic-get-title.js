/**
 * @name get title
 *
 * @desc Get the title of a page and print it to the console.
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#pagetitle}
 */
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://www.google.com/')
  const title = await page.title()
  console.log(title)
  await browser.close()
})()