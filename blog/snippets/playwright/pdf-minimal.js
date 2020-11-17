const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto('https://theheadless.dev/posts')
  await page.pdf({ path: 'hd-posts.pdf' })
  await browser.close()
})()
