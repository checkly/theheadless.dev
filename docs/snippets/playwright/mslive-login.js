const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://login.live.com/");

  await page.fill('[name="loginfmt"]', process.env.MSLIVE_USER);
  await page.click('[type="submit"]');

  await page.fill('input[type="password"]', process.env.MSLIVE_PWD);
  await page.keyboard.press("Enter");

  await browser.close();
})();
