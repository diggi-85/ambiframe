// Ein Bildschirmfoto: node snap.mjs <out.jpg> "<query>" "<js nach dem Laden>" [breite] [höhe] [motion]
import { writeFileSync } from "node:fs";
const [out, q, act = "", w = "1600", h = "900", motion = ""] = process.argv.slice(2);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const page = (await (await fetch("http://127.0.0.1:9333/json/list")).json()).find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let n = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) (pending.get(d.id)(d), pending.delete(d.id)); };
const send = (method, params = {}) => new Promise((r) => { const id = ++n; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
await send("Network.clearBrowserCache");
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: motion ? "no-preference" : "reduce" }] });
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: "http://127.0.0.1:8765/frontend/dev/index.html?demo&clean" + q });
await sleep(3500);
if (act) {
  const r = await send("Runtime.evaluate", { expression: `(async()=>{${act}})()`, awaitPromise: true });
  if (r.result?.exceptionDetails) console.error("JS:", r.result.exceptionDetails.exception?.description);
  await sleep(3500);
}
const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 85 });
writeFileSync(out, Buffer.from(shot.result.data, "base64"));
ws.close();
console.log("ok", out);