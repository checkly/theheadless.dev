const puppeteer = require('puppeteer')
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const navigationPromise = page.waitForNavigation()

  const templateHeader = fs.readFileSync('template-header.html', 'utf-8')
  const templateFooter = fs.readFileSync('template-footer.html', 'utf-8')

  await page.emulateMediaType('screen')

  await page.goto('https://theheadless.dev/posts')

  await navigationPromise

  await page.waitForSelector('.accept', { visible: true })
  await page.evaluate(() => document.querySelector('.accept').click())
  await page.waitForSelector('.accept', { hidden: true })

  await page.pdf({
    path: 'hd-posts.pdf',
    displayHeaderFooter: true,
    headerTemplate: templateHeader,
    footerTemplate: templateFooter,
    margin: {
      top: '100px',
      bottom: '40px'
    },
    printBackground: true
  })

  await browser.close()
})()
