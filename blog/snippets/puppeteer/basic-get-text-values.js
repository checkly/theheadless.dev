const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://danube-webshop.herokuapp.com");
  const categories = await page.$$eval("li a", (nodes) =>
    nodes.map((n) => n.innerText)
  );
  console.log(categories);
  await browser.close();
})();
