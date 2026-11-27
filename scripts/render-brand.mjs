// Rendert die Markenbilder aus docs/brand/*.svg zu PNG (transparenter Hintergrund) mit Chrome über CDP.
// Aufruf:  node scripts/render-brand.mjs                       → alle PNGs für README, GitHub-Vorschau und HA-Icon
//          node scripts/render-brand.mjs quelle.svg ziel.png 512 512 [skalierung]   → Einzelbild
// Braucht Google Chrome und frontend/node_modules (ws). Ändert nichts an Home Assistant.
import { spawn } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const WS = createRequire(join(ROOT, "frontend", "package.json"))("ws");
const BRAND = join(ROOT, "docs", "brand");
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const arg = process.argv.slice(2);
const JOBS = arg.length
  ? [[resolve(arg[0]), resolve(arg[1]), +arg[2], +arg[3], +(arg[4] ?? 1)]]
  : [
      [join(BRAND, "banner.svg"), join(BRAND, "banner.png"), 1376, 768, 1],
      [join(BRAND, "social.svg"), join(BRAND, "social.png"), 1280, 640, 1],
      [join(BRAND, "icon.svg"), join(BRAND, "icon@2x.png"), 512, 512, 1],
      [join(BRAND, "icon.svg"), join(BRAND, "icon.png"), 512, 512, 0.5],
    ];

const chrome = spawn(CHROME, ["--headless=new", "--disable-gpu", "--remote-debugging-port=9444",
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "brand-"))}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let list;
  for (let i = 0; i < 40 && !list; i++) {
    await sleep(250);
    try { list = await (await fetch("http://127.0.0.1:9444/json")).json(); } catch { /* Chrome startet noch */ }
  }
  if (!list) throw new Error("Chrome nicht erreichbar");
  const ws = new WS(list.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.once("open", r));
  let id = 0;
  const pending = new Map();
  ws.on("message", (m) => { const d = JSON.parse(m); pending.get(d.id)?.(d); });
  const send = (method, params = {}) => new Promise((res) => { pending.set(++id, res); ws.send(JSON.stringify({ id, method, params })); });

  for (const [src, out, w, h, scale] of JOBS) {
    await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: scale, mobile: false });
    await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
    await send("Page.navigate", { url: pathToFileURL(src).href });
    await sleep(600);
    const r = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
    writeFileSync(out, Buffer.from(r.result.data, "base64"));
  }
  ws.close();
} finally {
  chrome.kill();
}
console.log("fertig");
