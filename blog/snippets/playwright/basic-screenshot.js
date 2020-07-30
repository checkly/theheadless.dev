/**
 * @name screenshots
 *
 * @desc Snaps a basic screenshot of the full New York Time homepage and saves it a .png file.
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#pagescreenshotoptions}
 */

const {chromium} = require('playwright');

(async () => {
	const browser = await chromium.launch();
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('https://www.nytimes.com/')
  await page.screenshot({ path: 'nytimes.png', fullPage: true })
  await browser.close()
})()