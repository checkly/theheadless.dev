const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://danube-webshop.herokuapp.com')
  await page.screenshot({ path: 'my_screenshot.png' })
  await browser.close()
})()
