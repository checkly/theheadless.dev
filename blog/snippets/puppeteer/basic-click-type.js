const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.waitForSelector("input");
  await page.type("input", "some search terms");

  await page.waitForSelector("button");
  await page.click("button");

  await browser.close();
})();
