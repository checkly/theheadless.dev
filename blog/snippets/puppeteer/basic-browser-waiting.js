const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-store.herokuapp.com/')
  await page.click('#login')
  await page.waitForSelector('#n-email')
  await page.type('#n-email', 'user@example.com')
  await browser.close()
})()
