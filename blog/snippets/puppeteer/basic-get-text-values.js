const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://danube-store.herokuapp.com');
  const titles = await page.$$eval('.preview-title', nodes => nodes.map(n => n.innerText));
  console.log(titles);
  await browser.close();
})()