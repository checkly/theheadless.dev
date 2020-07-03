const { webkit } = require("playwright");
const productsNumber = process.env.PRODUCTS_NUMBER;

(async () => {
  const browser = await webkit.launch({ headless: false, slowMo: 15 });
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://danube-store.herokuapp.com/");
  
  for (i = 1; i <= productsNumber; i++) {
    await page.click(`.preview:nth-child(${i}) > .preview-author`);
    await page.click(".detail-wrapper > .call-to-action");
    await page.click("#logo");

    await navigationPromise;
  }

  await page.click("#cart");
  await page.click(".cart > .call-to-action");
  await page.click(".checkout > .call-to-action");

  await page.waitForSelector('#order-confirmation', { visible: true });

  await browser.close();
})();
