const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewportSize({ width: 1200, height: 800 })

  page.on('request', request =>
    console.log('>>', request.method(), request.url()))
  page.on('response', response =>
    console.log('<<', response.status(), response.url()))

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
