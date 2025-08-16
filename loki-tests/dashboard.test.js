const puppeteer = require('puppeteer');
const pixelmatch = require('pixelmatch').default;
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

jest.setTimeout(30000); // 30 segundos

describe('Dashboard Page Visual Regression', () => {
  const url = 'http://127.0.0.1:5000/dashboard';
  const basePath = path.join('loki_snapshots', 'base', 'dashboard.png');
  const newPath = path.join('loki_snapshots', 'dashboard.png');
  const diffPath = path.join('loki_snapshots', 'diff', 'dashboard-diff.png');

  // Crear carpetas si no existen
  ['loki_snapshots', path.join('loki_snapshots', 'base'), path.join('loki_snapshots', 'diff')].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  test('should match the visual snapshot', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1280, height: 800 });

    // Tomar screenshot
    const screenshot = await page.screenshot();
    fs.writeFileSync(newPath, screenshot);

    // Comparar si existe snapshot base
    if (fs.existsSync(basePath)) {
      const img1 = PNG.sync.read(fs.readFileSync(basePath));
      const img2 = PNG.sync.read(fs.readFileSync(newPath));
      const { width, height } = img1;
      const diff = new PNG({ width, height });

      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
      fs.writeFileSync(diffPath, PNG.sync.write(diff));

      expect(numDiffPixels).toBe(0); // fallará si hay cambios visuales
    } else {
      // Primer run: guardar como base
      fs.writeFileSync(basePath, screenshot);
      console.log('Base snapshot creado:', basePath);
    }

    await browser.close();
  }, 30000);
});
