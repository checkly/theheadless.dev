const fs = require('fs')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  const options = { logLevel: 'info', output: 'html', onlyCategories: ['performance'], port: chrome.port }
  const runnerResult = await lighthouse('https://danube-webshop.herokuapp.com', options)

  const reportHtml = runnerResult.report
  fs.writeFileSync('lhreport.html', reportHtml)

  console.log('Report is done for', runnerResult.lhr.finalUrl)

  console.log('First Contentful Paint - Score: ' +
  runnerResult.lhr.audits['first-contentful-paint'].score +
  ', Value: ' + runnerResult.lhr.audits['first-contentful-paint'].numericValue +
  ' ' + runnerResult.lhr.audits['first-contentful-paint'].numericUnit)

  console.log('Time To Interactive - Score: ' +
  runnerResult.lhr.audits.interactive.score +
  ', Value: ' + runnerResult.lhr.audits.interactive.numericValue +
  ' ' + runnerResult.lhr.audits.interactive.numericUnit)

  console.log('Speed Index - Score: ' +
   runnerResult.lhr.audits['speed-index'].score +
    ', Value: ' + runnerResult.lhr.audits['speed-index'].numericValue +
     ' ' + runnerResult.lhr.audits['speed-index'].numericUnit)

  await chrome.kill()
})()
