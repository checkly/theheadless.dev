const puppeteer = require('puppeteer')
const axios = require('axios')
const fs = require('fs')
const assert = require('chai').assert;

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.setViewport({ width: 1200, height: 800 })

  await page.waitForSelector(' #login')
  await page.click('#login')

  await page.waitForSelector('#n-email')

  await page.type('#n-email', process.env.USER_EMAIL)
  await page.type('#n-password2', process.env.USER_PASSWORD)

  await page.waitForSelector('#goto-signin-btn')
  await page.click('#goto-signin-btn')

  await page.waitForSelector('#goto-signin-btn', { hidden: true })
  await page.click('#account')

  await page.waitForSelector('#orders > ul > li:nth-child(1) > a')
  const downloadUrl = await page.$eval(
    '#orders > ul > li:nth-child(1) > a',
    (el) => el.href
  )

  const response = await axios.get(downloadUrl)

  const newFile = Buffer.from(response.data)
  const testFile = await fs.readFileSync('fixtures/testfile.pdf')

  assert(newFile.equals(testFile))

  await browser.close()
})()
