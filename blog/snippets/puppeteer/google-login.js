const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("https://stackoverflow.com/users/login");

  const navigationPromise = page.waitForNavigation();

  await page.waitForSelector("button.s-btn__google");
  await page.click("button.s-btn__google");

  await navigationPromise;
  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', process.env.GOOGLE_USER);
  await page.click("#identifierNext");

  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', process.env.GOOGLE_PWD);

  await page.waitForSelector("#passwordNext", { visible: true });
  await page.click("#passwordNext");

  await navigationPromise;
  await browser.close();
})();
