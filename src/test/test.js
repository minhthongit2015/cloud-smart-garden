const puppeteer = require('puppeteer');
const debug = require('debug')('');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms < 0 ? 999999999 : ms));
const p = name => `src/test/reports/${name}`;

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: { width: 1366, height: 768 }
  });
  const page = await browser.newPage();

  await page.goto('https://yoth-garden.herokuapp.com');
  await page.screenshot({ path: p('home.png') });
  debug('Captured Home page');

  await page.goto('https://yoth-garden.herokuapp.com/smile-city');
  await page.screenshot({ path: p('smile-city.png') });
  debug('Captured Smile City page');

  await browser.close();
})()
  .catch(async (error) => {
    debug(error);
    await sleep(-1);
  })
  .then(async (error) => {
    debug(error);
    await sleep(-1);
  });
