const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.goto('https://danube-store.herokuapp.com/')
  
  await page.setViewport({ width: 1200, height: 800 })
  
  await page.waitForSelector('#login')
  await page.click('#login')
  
  await page.waitForSelector('#n-email')
  
  await page.type('#n-email', process.env.USER_EMAIL);
  await page.type('#n-password2', process.env.USER_PASSWORD);
  
  await page.waitForSelector('#goto-signin-btn')
  await page.click('#goto-signin-btn')
  
  await page.waitForSelector('vm--modal', { hidden: true })
  await page.click('.fa-user')
  
  await page.waitForSelector('#user-details > div > input')
  const inputUploadHandle = await page.$('#user-details > div > input');
  let fileToUpload = '/Users/ragog/Downloads/prova.jpg';
  inputUploadHandle.uploadFile(fileToUpload);
  
  await page.waitForSelector('#user-details > div > button')
  await page.click('#user-details > div > button')
  
  await page.waitForSelector('#upload-message-succcess', { visible: true })

  await browser.close()
})()