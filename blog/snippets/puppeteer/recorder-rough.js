const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.setViewport({ width: 1792, height: 934 })

  await navigationPromise

  await navigationPromise

  await page.waitForSelector('body > #app > .topbar > input')
  await page.click('body > #app > .topbar > input')

  await page.waitForSelector('body > #app #button-search')
  await page.click('body > #app #button-search')

  await page.waitForSelector('.shop-content > ul > .preview:nth-child(1) > .preview-details > .preview-price')
  await page.click('.shop-content > ul > .preview:nth-child(1) > .preview-details > .preview-price')

  await page.waitForSelector('#app-content > .main-container > .detail > .detail-wrapper > .call-to-action')
  await page.click('#app-content > .main-container > .detail > .detail-wrapper > .call-to-action')

  await browser.close()
})()
