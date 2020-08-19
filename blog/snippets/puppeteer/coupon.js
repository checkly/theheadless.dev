const puppeteer = require("puppeteer");
const assert = require("chai").assert;
const productsNumber = process.env.PRODUCTS_NUMBER;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.setViewport({ width: 1792, height: 925 });

  for (i = 1; i <= productsNumber; i++) {
    await page.waitForSelector(
      ".preview:nth-child(1) > .preview-details > p:nth-child(1)"
    );
    await page.click(`.preview:nth-child(${i}) > .preview-author`);
    await page.waitForSelector(".detail-wrapper > .call-to-action");
    await page.click(".detail-wrapper > .call-to-action");
    await page.waitForSelector("#logo");
    await page.click("#logo");
  }

  await page.waitForSelector("#cart");
  await page.click("#cart");

  const price = await page.$eval("#total-price", (e) => e.innerText);

  await page.waitForSelector(".cart > label");
  await page.click(".cart > label");

  await page.waitForSelector("#coupon");
  await page.click("#coupon");

  await page.type("#coupon", "COUPON2020");

  await page.waitForSelector(".cart > div > button");
  await page.click(".cart > div > button");

  const expectedDiscountedPrice = price * 0.8;
  const discountedPrice = await page.$eval("#total-price", (e) => e.innerText);
  assert.equal(discountedPrice, expectedDiscountedPrice);

  await browser.close();
})();
