const { chromium } = require('playwright')
const fs = require('fs')
const assert = require('chai').assert;

(async () => {
  const browser = await chromium.launch()
  const context = await browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.click('#login')
  await page.type('#n-email', process.env.USER_EMAIL)
  await page.type('#n-password2', process.env.USER_PASSWORD)

  await page.click('#goto-signin-btn')

  await page.click('#account')

  await page.waitForSelector('#orders > ul > li:nth-child(1) > a')

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#orders > ul > li:nth-child(1) > a')
  ])

  const path = await download.path()

  const newFile = await fs.readFileSync(path)
  const testFile = await fs.readFileSync('fixtures/testfile.pdf')

  assert(newFile.equals(testFile))

  await browser.close()
})()
