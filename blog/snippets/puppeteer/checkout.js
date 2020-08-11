const puppeteer = require("puppeteer");
const productsNumber = process.env.PRODUCTS_NUMBER;

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.setViewport({ width: 1200, height: 800 });

  for (i = 1; i <= productsNumber; i++) {
    await page.waitForSelector(`.preview:nth-child(${i}) > .preview-author`);
    await page.click(`.preview:nth-child(${i}) > .preview-author`);

    await page.waitForSelector(".detail-wrapper > .call-to-action");
    await page.click(".detail-wrapper > .call-to-action");

    await page.waitForSelector("#logo");
    await page.click("#logo");

    await navigationPromise;
  }

  await page.waitForSelector("#cart");
  await page.click("#cart");

  await page.waitForSelector(".cart > .call-to-action");
  await page.click(".cart > .call-to-action");

  await page.waitForSelector("#s-name");
  await page.click("#s-name");

  await page.type("#s-name", "Max");
  await page.type("#s-surname", "Mustermann");
  await page.type("#s-address", "Charlottenstr. 57");
  await page.type("#s-zipcode", "10117");
  await page.type("#s-city", "Berlin");
  await page.type("#s-company", "Firma GmbH");

  await page.waitForSelector(".checkout > form");
  await page.click(".checkout > form");

  await page.waitForSelector("#asap");
  await page.click("#asap");

  await page.waitForSelector(".checkout > .call-to-action");
  await page.click(".checkout > .call-to-action");

  await page.waitForSelector("#order-confirmation", { visible: true });

  await browser.close();
})();
