const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com");
  const content = await page.evaluate(() => {
    let data = [];

    let books = document.querySelectorAll(".preview");
    books.forEach((book) => {
      let title = book.querySelector(".preview-title").innerText;
      let author = book.querySelector(".preview-author").innerText;
      let price = book.querySelector(".preview-price").innerText;
      data.push({
        title,
        author,
        price,
      });
    });
    return data;
  });

  const jsonData = JSON.stringify(content);
  fs.writeFileSync("books.json", jsonData);
  await browser.close();
})();
