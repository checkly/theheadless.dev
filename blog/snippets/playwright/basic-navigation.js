const { chromium } = require("playwright"); // import playwright

(async () => {
  const browser = await chromium.launch(); // launch playwright
  const page = await browser.newPage(); // get a page object
  await page.goto('https://example.com'); // navigate to https://example.com

  await browser.close(); // close the browser
})();