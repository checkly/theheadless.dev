const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const client = await page.target().createCDPSession()
  await client.send('Network.enable')
  await client.send('Network.emulateNetworkConditions', {
    offline: false,
    downloadThroughput: (4 * 1024 * 1024) / 8,
    uploadThroughput: (3 * 1024 * 1024) / 8,
    latency: 20
  })

  await page.goto('https://danube-webshop.herokuapp.com')

  // your flow and assertions

  await browser.close()
})()
