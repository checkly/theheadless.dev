const puppeteer = require("puppeteer");
const assert = require("chai").assert;

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const bookList = [
    "The Foreigner",
    "The Transformation",
    "For Whom the Ball Tells",
    "Baiting for Robot",
  ];

  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.setViewport({ width: 1200, height: 800 });

  await page.waitForSelector(".topbar > input");
  await page.click(".topbar > input");

  await page.type(".topbar > input", "for");

  await page.waitForSelector("#button-search");
  await page.click("#button-search");

  await page.waitForSelector(
    ".shop-content > ul > .preview:nth-child(1) > .preview-title"
  );

  // Halt immediately if results do not equal expected number
  let resultsNumber = (await page.$$(".preview-title")).length;
  assert.equal(resultsNumber, bookList.length);

  // Remove every element found from the original array...
  for (i = 0; i < resultsNumber; i++) {
    const resultTitle = await page.$eval(
      `.preview:nth-child(${i + 1}) > .preview-title`,
      (e) => e.innerText
    );

    const index = bookList.indexOf(resultTitle);
    bookList.splice(index, 1);
  }

  // ...then assert that the original array is now empty
  assert.equal(bookList.length, 0);

  await browser.close();
})();
