import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.startsWith('/PortFolio')) {
    reqPath = reqPath.slice('/PortFolio'.length);
  }
  if (!reqPath.startsWith('/')) reqPath = '/' + reqPath;

  let filePath = path.join(distDir, reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}/PortFolio`;

console.log(`[Test Server] Running at ${baseUrl}`);

let browser;
try {
  browser = await chromium.launch({ headless: true, channel: 'chrome' });
} catch (e) {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  browser = await chromium.launch({ headless: true, executablePath: chromePath });
}
const page = await browser.newPage();

const testPages = [
  { url: `${baseUrl}/projects/ue5-reality-capture/`, name: 'Reality Capture' },
  { url: `${baseUrl}/projects/ue5-procedural-environment/`, name: 'Procedural Env' },
  { url: `${baseUrl}/projects/ue5-metahuman-cinematics/`, name: 'MetaHumans' },
  { url: `${baseUrl}/projects/ue5-niagara-vfx/`, name: 'Niagara VFX' },
];

let allPassed = true;

for (const tp of testPages) {
  console.log(`\nTesting page: ${tp.name} (${tp.url})`);
  await page.goto(tp.url, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.deck-viewer-container', { timeout: 5000 });

  const container = page.locator('.deck-viewer-container');
  const count = await container.count();
  if (count === 0) {
    console.error(`  FAIL: .deck-viewer-container not found on ${tp.name}`);
    allPassed = false;
    continue;
  }

  const prevBtn = container.locator('.deck-prev');
  const nextBtn = container.locator('.deck-next');
  const img = container.locator('.deck-slide-img');
  const counterCurrent = container.locator('.deck-counter-current');
  const caption = container.locator('.deck-caption');

  const initialSrc = await img.getAttribute('src');
  const initialCounter = await counterCurrent.textContent();
  const initialCaption = await caption.textContent();
  const initialBase = path.basename(initialSrc);
  console.log(`  Initial: [${initialCounter}] src=${initialSrc} (${initialBase}) | caption=${initialCaption}`);

  // Test Next Slide
  await nextBtn.click();
  await page.waitForTimeout(200);

  const nextSrc = await img.getAttribute('src');
  const nextCounter = await counterCurrent.textContent();
  const nextCaption = await caption.textContent();
  const nextBase = path.basename(nextSrc);
  console.log(`  After Next: [${nextCounter}] src=${nextSrc} (${nextBase}) | caption=${nextCaption}`);

  if (nextBase === initialBase || nextCounter === initialCounter) {
    console.error(`  FAIL: Slide did not advance on ${tp.name}!`);
    allPassed = false;
  } else {
    console.log(`  ✓ Slide advanced successfully!`);
  }

  // Test Prev Slide (should return to initial)
  await prevBtn.click();
  await page.waitForTimeout(200);

  const returnedSrc = await img.getAttribute('src');
  const returnedCounter = await counterCurrent.textContent();
  const returnedBase = path.basename(returnedSrc);
  console.log(`  After Prev: [${returnedCounter}] src=${returnedSrc} (${returnedBase})`);

  if (returnedBase === initialBase && returnedCounter === initialCounter) {
    console.log(`  ✓ Slide returned to initial successfully!`);
  } else {
    console.error(`  FAIL: Slide did not return to initial on ${tp.name}`);
    allPassed = false;
  }

  // Take screenshot for visual verification
  await page.screenshot({ path: `/tmp/test_deck_${tp.name.toLowerCase().replace(/\s+/g, '_')}.png` });
}

await browser.close();
server.close();

if (allPassed) {
  console.log('\n🎉 ALL DECK VIEWER TESTS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error('\n❌ SOME TESTS FAILED.');
  process.exit(1);
}
