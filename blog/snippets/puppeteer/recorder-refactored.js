const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.setViewport({ width: 1792, height: 934 })

  await navigationPromise

  await page.click('input')

  await page.click('#button-search')

  await page.waitForSelector('.preview:nth-child(1)')
  await page.click('.preview:nth-child(1)')

  await page.waitForSelector('.call-to-action')
  await page.click('.call-to-action')

  await browser.close()
})()
