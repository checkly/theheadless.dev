const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://danube-webshop.herokuapp.com/')

  await browser.close()
})()
