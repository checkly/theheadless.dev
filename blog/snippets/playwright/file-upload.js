const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto("https://danube-webshop.herokuapp.com/");

  await page.click("#login");
  await page.click("#n-email");

  await page.type("#n-email", process.env.USER_EMAIL);
  await page.type("#n-password2", process.env.USER_PASSWORD);
  await page.click("#goto-signin-btn");

  await page.click(".fa-user");

  await page.waitForSelector("#user-details > div > input");

  const handle = await page.$('input[type="file"]');
  await handle.setInputFiles(process.env.FILE_PATH);

  await page.waitForSelector("#user-details > div > button");
  await page.click("#user-details > div > button");

  await page.waitForSelector("#upload-message-succcess", { visible: true });

  await browser.close();
})();
