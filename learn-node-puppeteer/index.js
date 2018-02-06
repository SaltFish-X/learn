const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({ path: './build/example/example.png' });

  await browser.close();
})();