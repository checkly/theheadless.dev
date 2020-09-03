const puppeteer = require('puppeteer')

const mockResponseObject = [
  {
    id: 1,
    title: 'How to Mock a Response',
    author: 'A. Friend',
    genre: 'business',
    price: '0.00',
    rating: '★★★★★',
    stock: 65535
  }
];

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.setRequestInterception(true)

  page.on('request', (request) => {
    if (request.url() === 'https://danube-webshop.herokuapp.com/api/books') {
      request.respond({
        content: 'application/json',
        body: JSON.stringify(mockResponseObject)
      })
    } else request.continue()
  })

  await page.setViewport({ width: 1200, height: 800 })

  await page.goto('https://danube-webshop.herokuapp.com/')

  await page.screenshot({ path: 'screenshot.png' })

  await browser.close()
})()
