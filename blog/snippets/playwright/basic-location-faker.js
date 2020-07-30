/**
 * @name location_faker
 *
 * @desc Fake the location for the geolocation API used by the browsers
 *
 */
const {chromium} = require('playwright');

(async () => {
	const browser = await chromium.launch();
	const screenshotPath = 'berlin.png';
	const url = 'https://mylocation.org/';


	const context = await browser.newContext();
	//Firstly, we need to override the permissions
	//so we don't have to click "Allow Location Access"
	await context.grantPermissions(['geolocation']);
	await context.setGeolocation({latitude: 52.5123393, longitude: 13.4476934});

	const page = await context.newPage();
	await page.goto(url);
	//Dismiss the cookie banner
	await page.click('.cc-btn.cc-dismiss');
	await page.click('#ui-accordion-accordion-header-1');
	await page.click('#geo-test')
	await page.screenshot({ path: screenshotPath })

	await browser.close()
})()