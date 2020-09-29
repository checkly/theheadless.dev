const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://danube-webshop.herokuapp.com')

  const performanceTimingJson = await page.evaluate(() => JSON.stringify(window.performance.timing))
  const performanceTiming = JSON.parse(performanceTimingJson)

  console.log(performanceTiming)

  const startToInteractive = performanceTiming.domInteractive - performanceTiming.navigationStart
  console.log(`Navigation start to DOM interactive: ${startToInteractive}ms`)

  await browser.close()
})()
