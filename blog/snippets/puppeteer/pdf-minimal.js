const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://theheadless.dev/posts')
  await page.pdf({ path: 'hd-posts.pdf' })
  await browser.close()
})()
