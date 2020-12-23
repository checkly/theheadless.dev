const { chromium } = require('playwright');
(async () => {
  const currency = process.env.CURRENCY
  const amazonUrl = process.env.AMAZON_URL
  const amazonUser = process.env.AMAZON_USER
  const amazonPassword = process.env.AMAZON_PASSWORD

  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(amazonUrl)

  await page.setViewportSize({ width: 1200, height: 1822 })

  await page.click(
    '#nav-signin-tooltip > .nav-action-button > .nav-action-inner'
  )

  await page.type('#ap_email', amazonUser)
  await page.click('#continue')
  await page.type('#ap_password', amazonPassword)

  await page.click('#signInSubmit')

  await page.click('#nav-link-accountList > .nav-long-width')

  await page.click('.ya-card__whole-card-link > .a-box > .a-box-inner > .a-row > .a-column > div')

  await page.click('#a-autoid-1-announce > .a-dropdown-prompt')

  await page.click('#orderFilter_2')

  let filteredPrices = []
  let prices = []

  await page.waitForSelector('.a-normal')
  const pages = await page.$$('.a-normal')

  for (const singlePage of pages) {
    await page.waitForSelector('.a-last')
    prices = await page.$$eval(
      '.a-column:nth-child(2) .a-color-secondary.value',
      (nodes) => nodes.map((n) => n.innerText)
    )

    filteredPrices = filteredPrices.concat(
      prices.filter((price) => price.includes(currency))
    )
    await page.waitForSelector('li.a-last')
    await page.click('li.a-last')
  }

  const cleanPrices = filteredPrices.map((x) => {
    return x.replace(',', '.').replace(/[^\d.,-]/g, '')
  })

  const totalExpense = cleanPrices.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
  console.log(`Total expense for the year: ${currency} ${totalExpense}`)

  await browser.close()
})()
