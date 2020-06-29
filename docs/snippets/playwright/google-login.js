const { webkit } = require("playwright");
(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://stackoverflow.com/users/login");

  await page.click("button.s-btn__google");

  await page.fill('input[type="email"]', process.env.GOOGLE_USER);
  await page.click("#identifierNext");

  await page.fill('input[type="password"]', process.env.GOOGLE_PWD);
  await page.click("#passwordNext");

  await browser.close();
})();
