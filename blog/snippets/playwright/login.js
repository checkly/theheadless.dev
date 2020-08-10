const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://danube-webshop.herokuapp.com//');
    
  await page.click('#login'); // 0
  
  await page.type('#n-email', process.env.USER_EMAIL); // 1

  await page.type('#n-password2', process.env.USER_PASSWORD); // 2
  
  await page.click('#goto-signin-btn'); // 3
  
  await page.waitForSelector('#login-message', { visible: true }); // 4

  await browser.close();
})();