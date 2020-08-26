const { chromium } = require("playwright");
const axios = require("axios");
const fs = require("fs");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com");
  const url = await page.$eval("img", (el) => el.src);

  const response = await axios.get(url);
  fs.writeFileSync("scraped-image.svg", response.data);

  await browser.close();
})();
