/**
 * @name hover
 *
 * @desc The hover function is a combination of scrolling and putting the mouse into a hover state over the requested element.
 * This example hovers the first track we find on the soundcloud.com homepage, which should trigger the play and like
 * buttons to be visible
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#pagehoverselector-options}
 */
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://soundcloud.com/')
  await page.hover('.playableTile__image')
  await page.screenshot({ path: 'hover.png' })
  await browser.close()
})()