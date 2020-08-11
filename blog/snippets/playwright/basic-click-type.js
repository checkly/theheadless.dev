const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.fill("input", "some search terms");

  await page.click("button");

  await browser.close();
})();
