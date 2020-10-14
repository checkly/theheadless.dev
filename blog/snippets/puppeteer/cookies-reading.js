const puppeteer = require('puppeteer')
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://github.com/login')

  await page.type('#login_field', process.env.GITHUB_USER)
  await page.type('#password', process.env.GITHUB_PWD)

  await page.waitForSelector('.js-cookie-consent-reject')
  await page.click('.js-cookie-consent-reject')
  await page.$eval('[name="commit"]', (elem) => elem.click())
  await page.waitForNavigation()

  const cookies = await page.cookies()
  const cookieJson = JSON.stringify(cookies)

  fs.writeFileSync('cookies.json', cookieJson)

  await browser.close()
})()
