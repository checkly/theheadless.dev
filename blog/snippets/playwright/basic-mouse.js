/**
 * @name keyboard
 *
 * @desc types into a text editor
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#pagemouse}
 */
const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({
    width: 640,
    height: 480, 
  })

  // go to a page setup for mouse event tracking
  await page.goto('http://unixpapa.com/js/testmouse.html')

  // click an area
  await page.mouse.click(132, 103, { button: 'left' })
  
  // the screenshot should show feedback from the page that right part was clicked.
  await page.screenshot({ path: 'mouse_click.png' })
  await browser.close()
})()