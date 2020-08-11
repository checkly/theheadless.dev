const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://danube-webshop.herokuapp.com/');
  
  await page.setViewport({ width: 1200, height: 800 });
  
  await page.waitForSelector('#signup');
  await page.click('#signup');
  
  await page.waitForSelector('#s-name');
  await page.click('#s-name');
  
  await page.type('#s-name', 'John');
  await page.type('#s-surname', 'Doe');
  await page.type('#s-email', process.env.USER_EMAIL);
  await page.type('#s-password2', process.env.USER_PASSWORD);
  await page.type('#s-company', 'John Doe Inc.');
  
  await page.waitForSelector('#business');
  await page.click('#business');
  
  await page.waitForSelector('#marketing-agreement');
  await page.click('#marketing-agreement');
  
  await page.waitForSelector('#privacy-policy');
  await page.click('#privacy-policy');
  
  await page.waitForSelector('#register-btn');
  await page.click('#register-btn');
  
  await page.waitForSelector('#login-message', { visible: true });
  
  await browser.close();
})()