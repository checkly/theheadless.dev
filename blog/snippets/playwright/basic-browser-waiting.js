const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto('https://danube-store.herokuapp.com/')
  await page.click('#login')
  await page.fill('#n-email', 'user@example.com')
  await browser.close()
})()
