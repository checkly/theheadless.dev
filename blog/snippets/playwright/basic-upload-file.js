/**
 * @name Playwright Download file / upload file
 *
 * @desc Find an image by class selector, downloads the image, saves it to disk and read it again. Use this together with a .fileUpload() method.
 *
 */

const { chromium } = require("playwright");
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const writeFileAsync = promisify(fs.writeFile);
(async () => {
	const browser = await chromium.launch({ headless: false });
	const page = await browser.newPage();
    await page.setViewportSize({
        width: 1200,
        height: 800,
      });

    // go to checklyhq.com and download a picture
	await page.goto("https://checklyhq.com/");
	const imageHref = await page.evaluate((sel) => {
		return document.querySelector(sel).getAttribute('src').replace('/', '');
	}, '.hero-image');
	
	const viewSource = await page.goto("https://checklyhq.com/" + imageHref);
	const buffer = await viewSource.body()
	await writeFileAsync(path.join(__dirname, "checkly.png"), buffer)
	console.log("The file was saved!")

    //upload the picture to an upload form
    await page.goto("https://the-internet.herokuapp.com/upload");

    const pathToImage = path.join(__dirname, 'checkly.png');
    
    page.on('filechooser', async (fileChooser) => {
        console.log(pathToImage);
        await fileChooser.setFiles(pathToImage);
      });
    await page.click("#file-upload");
    console.log("File upload button clicked!")
    
    await page.click("#file-submit");
    console.log("The file was uploaded!");
    
	browser.close()
})()