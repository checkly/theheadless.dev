const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://danube-store.herokuapp.com/');
    
  await page.waitForSelector('#login'); // 0
  await page.click('#login');
  
  await page.waitForSelector('#n-email'); // 1
  await page.type('#n-email', process.env.USER_EMAIL);

  await page.waitForSelector('#n-password2'); // 2
  await page.type('#n-password2', process.env.USER_PASSWORD);
  
  await page.waitForSelector('#goto-signin-btn'); 
  await page.click('#goto-signin-btn'); // 3
  
  await page.waitForSelector('#login-message', { visible: true }); // 4
  
  await browser.close();
})()