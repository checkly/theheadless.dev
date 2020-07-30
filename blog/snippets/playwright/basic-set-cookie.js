/**
 * @name set cookie
 *
 * @desc  Sets the "login_email" property in a Paypal cookie so the login screen is pre-filled with an email address.
 *
 * @see {@link https://github.com/microsoft/playwright/blob/master/docs/api.md#browsercontextaddcookiescookies}
 */

const cookie = {
    name: 'login_email',
    value: 'set_by_cookie@domain.com',
    domain: '.paypal.com',
    path: '/',
    httpOnly: true,
    secure: true
  }
  
  const {chromium} = require('playwright');

  (async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    console.log(cookie);
    await context.addCookies([cookie]);
    const page = await context.newPage()
    
    await page.goto('https://www.paypal.com/signin')
    await page.screenshot({ path: 'paypal_login.png' })
    await browser.close()
  })()