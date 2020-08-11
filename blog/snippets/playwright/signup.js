const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.click("#signup");
  await page.click("#s-name");

  await page.type("#s-name", "John");
  await page.type("#s-surname", "Doe");
  await page.type("#s-email", process.env.USER_EMAIL);
  await page.type("#s-password2", process.env.USER_PASSWORD);
  await page.type("#s-company", "John Doe Inc.");

  await page.click("#business");
  await page.click("#marketing-agreement");
  await page.click("#privacy-policy");
  await page.click("#register-btn");

  await page.waitForSelector("#login-message", { visible: true });

  await browser.close();
})();
