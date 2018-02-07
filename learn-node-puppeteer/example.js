const puppeteer = require('puppeteer');

async function run (config) {
  const browser = await puppeteer.launch({
    executablePath: './chrome-mac/Chromium.app/Contents/MacOS/Chromium',
    headless: false
  });
  const page = await browser.newPage();
  if (config == 'png') {
    await page.goto('https://example.com');
    await page.screenshot({ path: './build/example/example.png' });
  } else if (config == 'pdf') {
    await page.goto('https://news.ycombinator.com', { waitUntil: 'networkidle2' });
    await page.pdf({ path: 'hn.pdf', format: 'A4' });
  } else if(config == 'reported'){
    // Get the "viewport" of the page, as reported by the page.
    await page.goto('https://example.com');
    const dimensions = await page.evaluate(() => {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        deviceScaleFactor: window.devicePixelRatio
      };
    });
    console.log('Dimensions:', dimensions);
  }
  await browser.close();
}

run()