const options = {
  path: 'clipped_screenshot.png',
  fullPage: false,
  clip: {
    x: 5,
    y: 60,
    width: 240,
    height: 40
  }
}

const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('https://danube-webshop.herokuapp.com')
  await page.screenshot(options)
  await browser.close()
})()
