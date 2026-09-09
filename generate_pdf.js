const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Launching Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log('Generating English PDF...');
  const engPath = path.resolve('dist/cv-ats/index.html');
  if (!fs.existsSync(engPath)) {
      console.log('English HTML not found at', engPath);
  } else {
      await page.goto(`file://${engPath}`, {waitUntil: 'networkidle0'});
      await page.pdf({ path: 'public/Federico Colombo - ATS Resume_Eng.pdf', format: 'A4', printBackground: true });
      console.log('English PDF saved.');
  }
  
  console.log('Generating Italian PDF...');
  const itPath = path.resolve('dist/cv-ats-it/index.html');
  if (!fs.existsSync(itPath)) {
      console.log('Italian HTML not found at', itPath);
  } else {
      await page.goto(`file://${itPath}`, {waitUntil: 'networkidle0'});
      await page.pdf({ path: 'public/Federico Colombo - Curriculum Vitae ATS_IT.pdf', format: 'A4', printBackground: true });
      console.log('Italian PDF saved.');
  }
  
  await browser.close();
  console.log('Done!');
})();
