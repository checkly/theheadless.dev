const {chromium} = require('playwright')
const fs = require('fs');

(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto('https://danube-webshop.herokuapp.com')

  for (i = 1; i <= 3; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`);
    await page.click(".detail-wrapper > .call-to-action");
    await page.click("#logo");
  }

  const localStorage = await page.evaluate(() => JSON.stringify(window.localStorage));
  fs.writeFileSync('localstorage.json', localStorage)

  await browser.close()
})()
