import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const targetDir = path.join(projectRoot, 'applications', 'BUas_Cradle');

const filesToRender = [
  {
    html: path.join(targetDir, 'cv.html'),
    pdf: path.join(targetDir, 'Federico_Colombo_CV_BUas_Cradle.pdf'),
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    }
  },
  {
    html: path.join(targetDir, 'cover_letter.html'),
    pdf: path.join(targetDir, 'Federico_Colombo_Cover_Letter_BUas_Cradle.pdf'),
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    }
  }
];

let browser;
try {
  browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });
} catch (e) {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(chromePath)) {
    browser = await chromium.launch({
      headless: true,
      executablePath: chromePath,
    });
  } else {
    browser = await chromium.launch({ headless: true });
  }
}

const context = await browser.newContext({
  viewport: { width: 1200, height: 1600 },
  deviceScaleFactor: 2,
});

for (const item of filesToRender) {
  console.log(`Rendering: ${item.html} -> ${item.pdf}`);
  const page = await context.newPage();
  await page.goto(`file://${item.html}`, { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  const pdfBuffer = await page.pdf(item.pdfOptions);
  fs.writeFileSync(item.pdf, pdfBuffer);
  console.log(`✓ Generated ${path.basename(item.pdf)} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
  await page.close();
}

await browser.close();
console.log('Done!');
