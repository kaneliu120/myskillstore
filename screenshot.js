const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to desktop size
  await page.setViewport({ width: 1440, height: 900 });

  try {
    console.log('Navigating to localhost:3000/zh...');
    await page.goto('http://localhost:3000/zh', { waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log('Taking screenshot...');
    await page.screenshot({ path: 'v7-reverted-preview.png', fullPage: true });
    console.log('Screenshot saved to v7-reverted-preview.png');
  } catch (e) {
    console.error('Error:', e);
  } finally {
    await browser.close();
  }
})();
