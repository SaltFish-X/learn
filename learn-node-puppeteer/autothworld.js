const account = require('./account')
const pupeteer = require('puppeteer')

main()

async function main () {
  const browser = await pupeteer.launch({
    executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    headless: false
  })
  const page = await browser.newPage()
  await page.goto('https://thworld.net/auth/login')

  await page.type('#email', account.account, { delay: 20 })
  await page.type('#passwd', account.password, { delay: 20 })
  await page.click('#login')
  await page.waitForSelector('#result_ok')
  console.info('login')
  
  await page.waitForSelector('#verify-me', { timeout: 50000 })
  console.info('#verify-me')
  await page.waitForFunction("page.$('#checkin:disable') == null")
}