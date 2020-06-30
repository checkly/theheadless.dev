const puppeteer = require('puppeteer'); // import puppeteer

(async () => {
  const browser = await puppeteer.launch(); // launch puppeteer
  const page = await browser.newPage(); // get a page object
  await page.goto('https://example.com'); // navigate to https://example.com

  await browser.close(); // close the browser
})();