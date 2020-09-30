const chromeLauncher = require('chrome-launcher')
const puppeteer = require('puppeteer')
const lighthouse = require('lighthouse')
const request = require('request')
const util = require('util');

(async () => {
  const chrome = await chromeLauncher.launch()

  const resp = await util.promisify(request)(`http://localhost:${chrome.port}/json/version`)
  const { webSocketDebuggerUrl } = JSON.parse(resp.body)
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl })

  const { lhr } = await lighthouse('https://danube-webshop.herokuapp.com', { port: chrome.port }, null)

  console.log('Report complete for', lhr.finalUrl)

  console.log(`Time To Interactive - Score: ${lhr.audits.interactive.score}, 
Value: ${lhr.audits.interactive.numericValue} ${lhr.audits.interactive.numericUnit}`)

  await browser.disconnect()
  await chrome.kill()
})()
