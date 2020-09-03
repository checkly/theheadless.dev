const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1200, height: 800 })

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    if (request.resourceType() === 'image') request.abort()
    else request.continue()
  })

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
