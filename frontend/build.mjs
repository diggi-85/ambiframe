// Bündelt das Frontend zu custom_components/ambiframe/frontend/ambiframe.js und kopiert die Schriften.
import { build, context } from "esbuild";
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "..", "custom_components", "ambiframe", "frontend");
const watch = process.argv.includes("--watch");

// Variable Schriften lokal ausliefern: kein Google-Abruf, funktioniert auch ohne Internet
// Liste gemeinsam mit dem Frontend in src/fonts.json
const fonts = JSON.parse(readFileSync(join(root, "src", "fonts.json"), "utf8"));
const fontDir = join(out, "fonts");
rmSync(fontDir, { recursive: true, force: true });
mkdirSync(fontDir, { recursive: true });
for (const { pkg, file } of fonts) {
  cpSync(join(root, "node_modules", pkg, "files", file), join(fontDir, file));
}

// Versionsstempel: Displays vergleichen ihn mit dem Server und laden nach einem Update selbst neu
const version = new Date().toISOString();
writeFileSync(join(out, "version.json"), JSON.stringify({ version }) + "\n");

const options = {
  define: { __WB_VERSION__: JSON.stringify(version) },
  entryPoints: [join(root, "src", "main.ts")],
  outfile: join(out, "ambiframe.js"),
  bundle: true,
  format: "esm",
  target: "es2021",
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  legalComments: "none",
  logLevel: "info",
};

// Kleine Dashboard-Karte (lädt das große Bündel erst bei Bedarf), siehe src/card.ts
const card = { ...options, define: {}, entryPoints: [join(root, "src", "card.ts")], outfile: join(out, "ambiframe-card.js") };

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  await (await context(card)).watch();
} else {
  await build(options);
  await build(card);
}
