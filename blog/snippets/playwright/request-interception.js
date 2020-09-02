const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.setViewportSize({ width: 1200, height: 800 })

  await page.route('**/*', (route) => {
    return route.request().resourceType() === 'image'
      ? route.abort()
      : route.continue()
  })

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
