/**
 * @name Puppeteer Download file / upload file
 *
 * @desc Find an image by class selector, downloads the image, saves it to disk and read it again. Use this together with a .fileUpload() method.
 *
 */

const puppeteer = require('puppeteer')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile);
(async () => {
	const browser = await puppeteer.launch({});
	const page = await browser.newPage();
	await page.setViewport({ width: 1200, height: 800 });
    
    // go to checklyhq.com and download a picture
	await page.goto("https://checklyhq.com/");
	const imageHref = await page.evaluate((sel) => {
		return document.querySelector(sel).getAttribute('src').replace('/', '');
	}, '.hero-image');
	
	const viewSource = await page.goto("https://checklyhq.com/" + imageHref);
	const buffer = await viewSource.buffer()
	await writeFileAsync(path.join(__dirname, "checkly.png"), buffer)
	console.log("The file was saved!")

    //upload the picture to an upload form
    await page.goto("https://the-internet.herokuapp.com/upload", {"waitUntil":"networkidle2"});

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click("#file-upload") // click button that triggers file selection
    ])
    console.log("File upload button clicked!")

    const pathToImage = path.join(__dirname, 'checkly.png');
    await fileChooser.accept([pathToImage]);
    await page.click("#file-submit");

    console.log("The file was uploaded!");
	browser.close()
})()