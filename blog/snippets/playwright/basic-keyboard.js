/**
 * @name keyboard
 *
 * @desc types into a text editor
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#class-keyboard}
 */
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://trix-editor.org/')
  await page.focus('trix-editor')
  await page.keyboard.type('Just adding a title')
  await page.screenshot({ path: 'keyboard.png' })
  await browser.close()
})()