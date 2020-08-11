const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')
  await page.click('#app > .topbar > .account-buttons > #cart')
  await browser.close()
})()
