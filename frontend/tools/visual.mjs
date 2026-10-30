// Bildvergleiche aller Stile: rendert die Testumgebung (frontend/dev) in Chrome und vergleicht mit Referenzbildern.
//   npm run visual          → vergleichen (Fehler, wenn ein Bild abweicht; Abweichungen in test/visual/_diff/)
//   npm run visual:update   → Referenzbilder neu schreiben (nur nach bewusster Änderung am Aussehen!)
// Ohne neue Abhängigkeiten: Chrome rechnet den Pixelvergleich selbst (Canvas). Uhrzeit und Zufall sind eingefroren.
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const ROOT = resolve(import.meta.dirname, "../..");
const OUT = resolve(import.meta.dirname, "../test/visual");
const DIFF = join(OUT, "_diff");
const UPDATE = process.argv.includes("--update");
const ONLY = process.argv.find((a) => a.startsWith("--only="))?.slice(7);
// Anteil abweichender Pixel, ab dem ein Bild als verändert gilt (Kantenglättung schwankt minimal)
const TOLERANCE = 0.002;
const PAGES = ["zuhause", "wetter", "tagesvorschau"];
const CHROME =
  process.env.CHROME ??
  ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) => existsSync(p));
if (!CHROME) throw new Error("Chrome nicht gefunden – Pfad per CHROME=… angeben");

// Wählbare Stile aus dem Quelltext (die „saison-…“-Fassungen entstehen anders)
const themes = [...readFileSync(join(ROOT, "frontend/src/styles.ts"), "utf8").matchAll(/^    id: "([a-z]+)",$/gm)].map((m) => m[1]);
const shots = PAGES.flatMap((page) => themes.map((theme) => ({ name: `${page}-${theme}`, page, theme }))).filter((s) => !ONLY || s.name.includes(ONLY));

// Eingefrorene Zeit und Zufall – vor jedem Skript der Seite
const FREEZE = `(() => {
  const T = new Date("2026-10-30T09:30:00").getTime();
  const D = Date;
  class F extends D { constructor(...a) { super(...(a.length ? a : [T])); } static now() { return T; } }
  globalThis.Date = F;
  let s = 42; Math.random = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
})();`;

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".yaml": "text/yaml", ".woff2": "font/woff2", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };
const server = createServer((req, res) => {
  const path = join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!path.startsWith(ROOT) || !existsSync(path)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" }).end(readFileSync(path));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const profile = join(tmpdir(), `ambiframe-visual-${process.pid}`);
const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "--no-first-run", "--hide-scrollbars", "--force-color-profile=srgb", "--font-render-hinting=none", "about:blank"], { stdio: ["ignore", "ignore", "pipe"] });
const wsUrl = await new Promise((resolveUrl, reject) => {
  chrome.stderr.on("data", (d) => {
    const m = /ws:\/\/[^\s]+/.exec(String(d));
    if (m) resolveUrl(m[0]);
  });
  setTimeout(() => reject(new Error("Chrome startet nicht")), 15000);
});
const port = new URL(wsUrl).port;
const target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === "page");
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) (pending.get(d.id)(d), pending.delete(d.id));
};
const send = (method, params = {}) =>
  new Promise((r) => {
    const id = ++n;
    pending.set(id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
const evaluate = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result?.result?.value;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

await send("Page.enable");
await send("Page.addScriptToEvaluateOnNewDocument", { source: FREEZE });
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Emulation.setDeviceMetricsOverride", { width: 960, height: 540, deviceScaleFactor: 1, mobile: false });
await send("Emulation.setTimezoneOverride", { timezoneId: "Europe/Berlin" });
await send("Emulation.setLocaleOverride", { locale: "de-DE" });

mkdirSync(OUT, { recursive: true });
rmSync(DIFF, { recursive: true, force: true });
const failed = [];
for (const s of shots) {
  await send("Page.navigate", { url: `${base}/frontend/dev/index.html?demo&clean&page=${s.page}&theme=${s.theme}&mode=dark` });
  await sleep(1500);
  await evaluate("document.fonts.ready.then(() => true)");
  await sleep(400);
  // E-Ink: nichts darf sich bewegen – jede Animation oder Überblendung zeichnet den Bildschirm neu
  if (s.theme === "eink") {
    const moving = await evaluate(`(() => {
      const all = (r) => [...r.querySelectorAll("*")].flatMap((e) => [e, ...(e.shadowRoot ? all(e.shadowRoot) : [])]);
      return all(document).filter((e) => { const c = getComputedStyle(e); return c.animationName !== "none" || c.transitionDuration.split(",").some((v) => parseFloat(v) > 0); }).length;
    })()`);
    if (moving) failed.push(`${s.name}: ${moving} Elemente bewegen sich`);
  }
  const png = (await send("Page.captureScreenshot", { format: "png" })).result.data;
  const file = join(OUT, `${s.name}.png`);
  if (UPDATE || !existsSync(file)) {
    writeFileSync(file, Buffer.from(png, "base64"));
    continue;
  }
  const ref = readFileSync(file).toString("base64");
  // Vergleich im Browser: beide Bilder auf Canvas, Pixel mit deutlicher Abweichung zählen, Abweichungen rot markieren
  const r = await evaluate(`(async () => {
    const load = (b) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = "data:image/png;base64," + b; });
    const [a, b] = await Promise.all([load(${JSON.stringify(png)}), load(${JSON.stringify(ref)})]);
    if (a.width !== b.width || a.height !== b.height) return { ratio: 1, diff: "" };
    const c = new OffscreenCanvas(a.width, a.height), x = c.getContext("2d");
    x.drawImage(a, 0, 0); const A = x.getImageData(0, 0, a.width, a.height);
    x.drawImage(b, 0, 0); const B = x.getImageData(0, 0, a.width, a.height);
    let bad = 0;
    for (let i = 0; i < A.data.length; i += 4) {
      const d = Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]);
      if (d > 48) { bad++; B.data[i] = 255; B.data[i + 1] = 0; B.data[i + 2] = 0; }
    }
    x.putImageData(B, 0, 0);
    const blob = await c.convertToBlob({ type: "image/png" });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    let bin = ""; for (const v of bytes) bin += String.fromCharCode(v);
    return { ratio: bad / (A.data.length / 4), diff: btoa(bin) };
  })()`);
  if (r.ratio > TOLERANCE) {
    mkdirSync(DIFF, { recursive: true });
    writeFileSync(join(DIFF, `${s.name}.png`), Buffer.from(png, "base64"));
    if (r.diff) writeFileSync(join(DIFF, `${s.name}.unterschied.png`), Buffer.from(r.diff, "base64"));
    failed.push(`${s.name} (${(r.ratio * 100).toFixed(2)} %)`);
  }
}
ws.close();
// Erst nach dem Beenden aufräumen – Chrome schreibt beim Schließen noch ins Profil
await new Promise((r) => (chrome.once("exit", r), chrome.kill()));
server.close();
rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });

if (UPDATE) console.log(`${shots.length} Referenzbilder geschrieben.`);
else if (failed.length) {
  console.error(`✗ ${failed.length} von ${shots.length} Bildern weichen ab (siehe test/visual/_diff):\n  ${failed.join("\n  ")}`);
  process.exit(1);
} else console.log(`✓ ${shots.length} Bilder unverändert.`);
