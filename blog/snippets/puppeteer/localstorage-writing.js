const puppeteer = require('puppeteer')
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('https://danube-webshop.herokuapp.com')

  const localStorage = fs.readFileSync('localstorage.json', 'utf8')

  const deserializedStorage = JSON.parse(localStorage)
  await page.evaluate(deserializedStorage => {
    for (const key in deserializedStorage) {
      localStorage.setItem(key, deserializedStorage[key]);
    }
  }, deserializedStorage);

  await page.waitForSelector("#cart");
  await page.click("#cart");

  await browser.close()
})()
