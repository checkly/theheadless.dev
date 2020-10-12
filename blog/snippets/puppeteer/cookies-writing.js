const puppeteer = require('puppeteer')
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const cookies = fs.readFileSync('cookies.json', 'utf8')

  const deserializedCookies = JSON.parse(cookies)
  await page.setCookie(...deserializedCookies)

  await page.goto(`https://github.com/${process.env.GITHUB_USER}`)

  await browser.close()
})()
