const assert = require("chai").assert;
const { chromium } = require("playwright");
const productsNumber = process.env.PRODUCTS_NUMBER;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://danube-webshop.herokuapp.com/");

  for (i = 1; i <= productsNumber; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`);
    await page.click(".detail-wrapper > .call-to-action");
    await page.click("#logo");
  }

  await page.click("#cart");

  await page.waitForSelector("#total-price");
  const price = await page.$eval("#total-price", (e) => e.innerText);

  await page.click(".cart > label");
  await page.click("#coupon");
  await page.type("#coupon", "COUPON2020");
  await page.click(".cart > div > button");

  const expectedDiscountedPrice = price * 0.8;
  const discountedPrice = await page.$eval("#total-price", (e) => e.innerText);
  assert.equal(discountedPrice, expectedDiscountedPrice);

  await browser.close();
})();
