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

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://danube-webshop.herokuapp.com')
  await page.screenshot(options)
  await browser.close()
})()
