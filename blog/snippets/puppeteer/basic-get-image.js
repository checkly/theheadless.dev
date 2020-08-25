const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com");
  const url = await page.$eval("img", (el) => el.src);

  axios
    .get(url)
    .then(function (response) {
      fs.writeFileSync("scraped-image.svg", response.data);
    })
    .catch(function (error) {
      console.log(error);
    });

  await browser.close();
})();
