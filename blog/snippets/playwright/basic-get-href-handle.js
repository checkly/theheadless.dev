const {chromium} = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-store.herokuapp.com');
  const element = await page.$('a');
  const href = await element.evaluate(node => node.href);
  console.log(href);
  await browser.close();
})()