const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com");
  const url = await page.$eval("a", (el) => el.href);
  console.log(url);
  await browser.close();
})();
