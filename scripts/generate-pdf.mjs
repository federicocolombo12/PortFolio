import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const publicDir = path.join(projectRoot, 'public');

if (!fs.existsSync(distDir)) {
  console.error("Error: 'dist' directory not found. Please run 'npx astro build' first.");
  process.exit(1);
}

// 1. Lightweight HTTP static server for dist
const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  
  // Strip base path /PortFolio if present
  if (reqPath.startsWith('/PortFolio')) {
    reqPath = reqPath.slice('/PortFolio'.length);
  }
  if (!reqPath.startsWith('/')) reqPath = '/' + reqPath;

  let filePath = path.join(distDir, reqPath);

  // If directory, look for index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  } else if (!fs.existsSync(filePath) && fs.existsSync(filePath + '.html')) {
    filePath = filePath + '.html';
  } else if (!fs.existsSync(filePath) && fs.existsSync(path.join(filePath, 'index.html'))) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + req.url);
  }
});

// Start server on an open port
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const port = server.address().port;
const baseUrl = `http://127.0.0.1:${port}/PortFolio`;
console.log(`[PDF Generator] Local static server running at ${baseUrl}`);

// 2. Launch Chromium via Playwright
let browser;
try {
  browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
  });
} catch (e) {
  // Fallback to direct Chrome executable or default bundled chromium
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
  deviceScaleFactor: 2, // High-DPI crisp rendering
});

const targets = [
  {
    url: `${baseUrl}/cv/`,
    outputFilename: 'Federico Colombo - Resume.pdf',
    // Graphic single page
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  },
  {
    url: `${baseUrl}/cv-it/`,
    outputFilename: 'Federico Colombo - Curriculum Vitae.pdf',
    // Graphic single page
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  },
  {
    url: `${baseUrl}/cv-ats/`,
    outputFilename: 'Federico Colombo - Resume (Standard).pdf',
    // Standard text CV
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  },
  {
    url: `${baseUrl}/cv-ats-it/`,
    outputFilename: 'Federico Colombo - Curriculum Vitae (Standard).pdf',
    // Standard text CV
    pdfOptions: {
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    },
  },
];

console.log('[PDF Generator] Generating pixel-perfect vector PDFs via Headless Chromium...');

for (const target of targets) {
  const page = await context.newPage();
  
  // Navigate and wait until network is completely idle & fonts loaded
  await page.goto(target.url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  
  // Hide web controls bar during print capture
  await page.addStyleTag({
    content: `
      .cv-controls, .controls { display: none !important; }
      body { background-color: white !important; margin: 0 !important; }
      .cv-container, .document { margin: 0 auto !important; box-shadow: none !important; }
    `
  });

  // Emulate print media
  await page.emulateMedia({ media: 'print' });

  // Render PDF buffer
  const pdfBuffer = await page.pdf(target.pdfOptions);

  // Write to both public/ (for dev/git) and dist/ (for deployment)
  const publicDest = path.join(publicDir, target.outputFilename);
  const distDest = path.join(distDir, target.outputFilename);

  fs.writeFileSync(publicDest, pdfBuffer);
  fs.writeFileSync(distDest, pdfBuffer);

  console.log(`  ✓ Created: ${target.outputFilename} (${(pdfBuffer.length / 1024).toFixed(1)} KB)`);
  await page.close();
}

await browser.close();
server.close();
console.log('[PDF Generator] All PDFs generated with 100% web design fidelity.');
