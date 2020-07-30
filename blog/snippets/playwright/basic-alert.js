const {chromium} = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://checklyhq.com/");

  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
  });

  await page.evaluate(() => alert("This message is inside an alert box"));
  await browser.close();
})();
