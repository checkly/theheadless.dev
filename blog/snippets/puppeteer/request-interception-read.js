const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setViewport({ width: 1200, height: 800 })

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    console.log('>>', request.method(), request.url())
    request.continue()
  })

  page.on('response', (response) => {
    console.log('<<', response.status(), response.url())
  })

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
