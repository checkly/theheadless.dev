const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("https://www.nytimes.com/");
  await page.screenshot({ path: "nytimes1.png", fullPage: true });
  await browser.close();
})();
