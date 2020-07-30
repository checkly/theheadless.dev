/**
 * @name pdf
 *
 * @desc Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#pagepdfoptions}
 */

const {chromium} = require('playwright');

(async () => {
	const browser = await chromium.launch();
  const page = await browser.newPage()

  //1. Create PDF from URL
  await page.goto('https://github.com/microsoft/playwright/blob/master/docs/api.md#pagepdfoptions')
  await page.pdf({ path: 'api.pdf', format: 'A4' })

  //2. Create PDF from static HTML
  const htmlContent = `<body>
  <h1>An example static HTML to PDF</h1>
  </body>`;
  await page.setContent(htmlContent);
  await page.pdf({ path: 'html.pdf', format: 'A4' })

  await browser.close()
})()