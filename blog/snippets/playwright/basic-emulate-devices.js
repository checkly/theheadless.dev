/**
 * @name Playwright emulate devices
 *
 * @desc Use the built in devices descriptors to emulate an Iphone 6.
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#playwrightdevices
 */

const { chromium, devices } = require("playwright");
const iPhone = devices['iPhone 6'];

(async () => {
	const browser = await chromium.launch();
    const context = await browser.newContext({
        ...iPhone
      });

    const page = await context.newPage();
    await page.goto('http://google.com')
    await page.screenshot({
        path: 'full.png',
        fullPage: true
      })
  console.log(await page.title())
	await browser.close()
})()