// Hintergrund-Animationen einer Seite: Partikel, Schnee, Sterne, fließender Verlauf, Farbwechsel, Polarlicht,
// Lichtschimmer, Nebel – alle sehr ruhig
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import type { AmbientKind } from "../types";
import { define } from "../widgets/base";
import { FX } from "./effects";

export interface AmbientSettings {
  type: AmbientKind;
  strength: 1 | 2 | 3;
  speed: "slow" | "normal";
  /** Eigene Farbe (Glitzer, Zeichenregen, Blasen …); leer = Farbe des Stils */
  color?: string;
  /** Wetter-Entität für „Wie das Wetter“ (leer = erste weather.*) */
  weather?: string;
}

/** Reproduzierbarer Zufall – gleiche Seite, gleiches Bild */
const random = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Kachelbares Rauschen als Maske für den Nebel */
const noise = (seed: number, fx: number, fy: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='640' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${fx} ${fy}' numOctaves='3' seed='${seed}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.2 0 0 0 -0.85'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
  )}")`;
const MIST_1 = noise(7, 0.0035, 0.009);
const MIST_2 = noise(23, 0.005, 0.012);

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  ph: number;
  tw: number;
}

/** Diese Arten zeichnet die Leinwand (Canvas), die übrigen sind CSS-Ebenen */
const BUILTIN = new Set(["particles", "snow", "stars", "glitter"]);
const CANVAS = { has: (type: string) => BUILTIN.has(type) || type in FX };

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export class AfAmbient extends LitElement {
  static properties = {
    type: {},
    strength: { type: Number },
    speed: {},
    tint: {},
    small: { type: Boolean },
  };

  type: AmbientKind = "none";
  strength: 1 | 2 | 3 = 1;
  speed: "slow" | "normal" = "slow";
  /** Glitzerfarbe; leer = Akzentfarbe des Stils */
  tint?: string;
  /** Kleine Vorschau im Editor: weniger Teilchen */
  small = false;

  private raf = 0;
  private particles: Particle[] = [];
  private color = "255,255,255";
  private colorAt = 0;
  private last = 0;
  private resize?: ResizeObserver;
  /** Sternschnuppe: Start, Richtung, Länge (nur Sternenhimmel) */
  private shoot?: { t: number; x: number; y: number; dx: number; dy: number };
  private nextShoot = 0;
  /** Zustand eines Effekts aus effects.ts */
  private fxState: unknown;

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
      display: block;
    }
    canvas,
    .layer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    /* Fließender Verlauf: große, weiche Farbflächen wandern über Minuten */
    .flow i {
      position: absolute;
      width: 85%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(circle at center, var(--c) 0%, transparent 68%);
      will-change: transform;
      animation: var(--n) calc(var(--d) * var(--k)) var(--af-ease-soft, ease-in-out) infinite alternate;
    }
    .flow .b1 {
      --c: var(--af-flow-1, var(--af-accent-soft));
      --d: 70s;
      --n: f1;
      left: -22%;
      top: -34%;
    }
    .flow .b2 {
      --c: var(--af-flow-2, color-mix(in srgb, var(--af-cold) 20%, transparent));
      --d: 86s;
      --n: f2;
      right: -28%;
      top: -12%;
    }
    .flow .b3 {
      --c: var(--af-flow-3, var(--af-accent-soft));
      --d: 98s;
      --n: f3;
      left: 18%;
      bottom: -48%;
    }
    .flow .b4 {
      --c: var(--af-flow-1, color-mix(in srgb, var(--af-cold) 14%, transparent));
      --d: 112s;
      --n: f4;
      right: 6%;
      bottom: -42%;
      width: 60%;
    }
    @keyframes f1 {
      to {
        transform: translate(26%, 20%) scale(1.15);
      }
    }
    @keyframes f2 {
      to {
        transform: translate(-22%, 24%) scale(0.9);
      }
    }
    @keyframes f3 {
      to {
        transform: translate(12%, -20%) scale(1.2);
      }
    }
    @keyframes f4 {
      to {
        transform: translate(-28%, -12%) scale(1.1);
      }
    }

    /* Lichtschimmer: weiche Lichtpunkte blenden langsam auf und ab */
    .bokeh i {
      position: absolute;
      border-radius: 50%;
      aspect-ratio: 1;
      background: radial-gradient(circle, var(--c) 0%, transparent 70%);
      opacity: 0;
      will-change: transform, opacity;
      animation: glow calc(var(--d) * var(--k)) ease-in-out var(--delay) infinite;
    }
    @keyframes glow {
      0%,
      100% {
        opacity: 0;
        transform: translate(0, 0) scale(0.9);
      }
      50% {
        opacity: var(--o);
        transform: translate(var(--dx), var(--dy)) scale(1.05);
      }
    }

    /* Nebel: zwei Schwaden ziehen gegeneinander */
    .mist .layer {
      inset: -8% auto -8% 0;
      width: 200%;
      height: 116%;
      background: var(--af-mist);
      -webkit-mask-size: 50% 100%;
      mask-size: 50% 100%;
      -webkit-mask-repeat: repeat-x;
      mask-repeat: repeat-x;
      will-change: transform;
    }
    .mist .m1 {
      -webkit-mask-image: var(--m1);
      mask-image: var(--m1);
      animation: drift calc(170s * var(--k)) linear infinite;
    }
    .mist .m2 {
      -webkit-mask-image: var(--m2);
      mask-image: var(--m2);
      animation: drift calc(240s * var(--k)) linear infinite reverse;
      opacity: 0.75;
    }
    @keyframes drift {
      to {
        transform: translateX(-50%);
      }
    }

    /* Farbwechsel: ein weicher Verlauf, dessen Farbton über Minuten einmal rundum wandert */
    .hue {
      background:
        radial-gradient(70% 90% at 15% 20%, var(--af-flow-1, color-mix(in srgb, var(--af-accent) 45%, transparent)), transparent 70%),
        radial-gradient(70% 90% at 85% 80%, var(--af-flow-2, color-mix(in srgb, var(--af-cold) 40%, transparent)), transparent 70%);
      animation: hue calc(240s * var(--k)) linear infinite;
    }
    @keyframes hue {
      to {
        filter: hue-rotate(360deg);
      }
    }

    /* Polarlicht: drei weiche Lichtbänder wehen oben über den Himmel */
    .aurora {
      filter: blur(38px);
      mix-blend-mode: var(--af-aurora-blend, screen);
    }
    .aurora i {
      position: absolute;
      left: -20%;
      width: 140%;
      height: 34%;
      border-radius: 50%;
      background: linear-gradient(90deg, transparent, var(--c) 25%, var(--c2) 55%, transparent 85%);
      transform-origin: 50% 100%;
      animation: sway calc(var(--d) * var(--k)) var(--af-ease-soft, ease-in-out) infinite alternate;
    }
    .aurora .a1 {
      --c: rgba(70, 230, 160, 0.55);
      --c2: rgba(60, 200, 210, 0.45);
      --d: 38s;
      top: 2%;
    }
    .aurora .a2 {
      --c: rgba(60, 210, 200, 0.4);
      --c2: rgba(140, 100, 255, 0.4);
      --d: 52s;
      top: 14%;
      animation-delay: -20s;
    }
    .aurora .a3 {
      --c: rgba(150, 110, 255, 0.32);
      --c2: rgba(70, 230, 160, 0.3);
      --d: 64s;
      top: -6%;
      animation-delay: -35s;
    }
    @keyframes sway {
      0% {
        transform: translateX(-6%) skewX(-12deg) scaleY(0.8);
        opacity: 0.55;
      }
      50% {
        opacity: 1;
      }
      100% {
        transform: translateX(6%) skewX(10deg) scaleY(1.15);
        opacity: 0.7;
      }
    }

    /* Regentropfen auf der Scheibe: kleine Linsen, die den Inhalt dahinter weich zeigen; einige rinnen herunter */
    .rain i {
      position: absolute;
      border-radius: 50% 50% 48% 48% / 46% 46% 54% 54%;
      /* Linse: dahinter unscharf und heller, oben ein Lichtpunkt, unten ein heller Rand, darunter ein Schatten */
      -webkit-backdrop-filter: blur(3px) brightness(1.3) saturate(1.4) contrast(1.1);
      backdrop-filter: blur(3px) brightness(1.3) saturate(1.4) contrast(1.1);
      background:
        radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.85) 0 8%, rgba(255, 255, 255, 0.12) 22%, transparent 45%),
        radial-gradient(circle at 50% 80%, rgba(255, 255, 255, 0.28), transparent 42%),
        radial-gradient(circle at 50% 50%, transparent 58%, rgba(0, 0, 0, 0.28) 100%);
      border: 1px solid rgba(255, 255, 255, 0.22);
      box-shadow:
        inset 0 -2px 4px rgba(255, 255, 255, 0.4),
        0 3px 5px rgba(0, 0, 0, 0.3);
      opacity: 0;
      animation: drop var(--d) ease-in var(--delay) infinite;
    }
    .rain i.run {
      animation: run var(--d) cubic-bezier(0.55, 0, 0.9, 0.6) var(--delay) infinite;
    }
    @keyframes drop {
      0% {
        opacity: 0;
        transform: scale(0.4);
      }
      8%,
      80% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(1);
      }
    }
    @keyframes run {
      0% {
        opacity: 0;
        transform: translateY(0);
      }
      6% {
        opacity: 1;
        transform: translateY(0);
      }
      30% {
        transform: translateY(2vh);
      }
      100% {
        opacity: 0.9;
        transform: translateY(80vh);
      }
    }

    /* Lavalampe: weiche Farbblasen steigen und sinken */
    .lava i {
      position: absolute;
      bottom: -20%;
      border-radius: 50%;
      background: radial-gradient(circle at 40% 35%, var(--c), transparent 70%);
      filter: blur(8px);
      animation: lava calc(var(--d) * var(--k)) ease-in-out var(--delay) infinite alternate;
    }
    @keyframes lava {
      to {
        transform: translateY(-115%) scale(var(--s));
      }
    }

    /* Wellen am unteren Rand */
    .waves svg {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 200%;
      height: 34%;
    }
    .waves .w1 {
      animation: wave calc(26s * var(--k)) linear infinite;
    }
    .waves .w2 {
      animation: wave calc(38s * var(--k)) linear infinite reverse;
      bottom: -3%;
    }
    .waves .w3 {
      animation: wave calc(52s * var(--k)) linear infinite;
      bottom: -6%;
    }
    @keyframes wave {
      to {
        transform: translateX(-50%);
      }
    }

    /* Wolken ziehen langsam vorbei */
    .clouds i {
      position: absolute;
      width: var(--w);
      height: calc(var(--w) * 0.42);
      border-radius: 50%;
      background:
        radial-gradient(40% 60% at 30% 60%, var(--af-cloud, rgba(255, 255, 255, 0.16)), transparent 70%),
        radial-gradient(45% 70% at 60% 45%, var(--af-cloud, rgba(255, 255, 255, 0.16)), transparent 70%),
        radial-gradient(35% 55% at 80% 65%, var(--af-cloud, rgba(255, 255, 255, 0.14)), transparent 70%);
      filter: blur(6px);
      animation: cloud calc(var(--d) * var(--k)) linear var(--delay) infinite;
    }
    @keyframes cloud {
      from {
        transform: translateX(-60vw);
      }
      to {
        transform: translateX(130vw);
      }
    }

    /* Kaminfeuer: warmer, flackernder Schein von unten, dazu aufsteigende Funken */
    .fire .glow {
      position: absolute;
      left: -10%;
      right: -10%;
      bottom: 0;
      height: 70%;
      background: radial-gradient(55% 75% at 50% 100%, rgba(255, 140, 40, 0.6), rgba(255, 80, 20, 0.28) 45%, transparent 78%);
      transform-origin: 50% 100%;
      animation: flicker 2.3s ease-in-out infinite;
    }
    .fire .glow.g2 {
      background: radial-gradient(35% 55% at 42% 100%, rgba(255, 200, 90, 0.5), transparent 70%);
      animation-duration: 1.7s;
      animation-delay: -0.6s;
    }
    @keyframes flicker {
      0%,
      100% {
        opacity: 0.85;
        transform: scale(1, 1);
      }
      23% {
        opacity: 1;
        transform: scale(1.03, 1.08);
      }
      41% {
        opacity: 0.75;
        transform: scale(0.98, 0.95);
      }
      67% {
        opacity: 0.95;
        transform: scale(1.02, 1.04);
      }
    }
    .fire .ember {
      position: absolute;
      bottom: 0;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: #ffb347;
      box-shadow: 0 0 6px #ff8a1f;
      opacity: 0;
      animation: ember var(--d) ease-out var(--delay) infinite;
    }
    @keyframes ember {
      0% {
        opacity: 0;
        transform: translate(0, 0);
      }
      10% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translate(var(--dx), -55vh);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .rain i,
      .lava i,
      .waves svg,
      .clouds i,
      .fire .glow,
      .fire .ember,
      .hue,
      .aurora i,
      .flow i,
      .bokeh i,
      .mist .layer {
        animation: none;
      }
      .bokeh i {
        opacity: calc(var(--o) * 0.6);
      }
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this.onVisibility);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this.onVisibility);
    cancelAnimationFrame(this.raf);
    this.resize?.disconnect();
  }

  private onVisibility = (): void => {
    cancelAnimationFrame(this.raf);
    if (!document.hidden && CANVAS.has(this.type) && !reducedMotion()) this.raf = requestAnimationFrame(this.frame);
  };

  protected updated(changed: PropertyValues): void {
    if (!CANVAS.has(this.type)) {
      cancelAnimationFrame(this.raf);
      return;
    }
    if (changed.has("type") || changed.has("strength") || changed.has("small")) this.setupParticles();
    if (changed.has("tint")) this.colorAt = 0;
  }

  /* ───────── Partikel, Schnee, Sterne (Canvas, 30 Bilder/s) ───────── */

  private get canvas(): HTMLCanvasElement | null {
    return this.renderRoot.querySelector("canvas");
  }

  private setupParticles(): void {
    const c = this.canvas;
    if (!c) return;
    this.resize?.disconnect();
    this.resize = new ResizeObserver(() => this.sizeCanvas());
    this.resize.observe(this);
    this.sizeCanvas();
    const rnd = random(11);
    const w = c.width;
    const h = c.height;
    const unit = w / 1280;
    const fx = FX[this.type];
    if (fx) {
      const n = fx.counts[this.strength - 1];
      this.fxState = fx.init(this.fxContext(c, 0, 0), this.small ? Math.max(1, Math.ceil(n / 3)) : n);
      cancelAnimationFrame(this.raf);
      if (reducedMotion()) this.draw(0);
      else this.raf = requestAnimationFrame(this.frame);
      return;
    }
    const make = (count: number, p: () => Omit<Particle, "x" | "y" | "ph">) =>
      Array.from({ length: this.small ? Math.ceil(count / 3) : count }, () => ({ x: rnd() * w, y: rnd() * h, ph: rnd() * Math.PI * 2, ...p() }));
    if (this.type === "snow") {
      // Flocken: groß = nah = schneller; kleine weit hinten
      this.particles = make([60, 100, 150][this.strength - 1], () => {
        const near = rnd() * rnd();
        return { r: (1 + near * 4) * unit * 1.3, vx: (rnd() - 0.5) * 0.15 * unit, vy: (0.35 + near * 1.1) * unit, a: 0.35 + near * 0.5, tw: 0.3 + rnd() * 0.5 };
      });
    } else if (this.type === "stars") {
      this.particles = make([110, 170, 240][this.strength - 1], () => ({
        r: (0.5 + rnd() * rnd() * 1.6) * unit * 1.3,
        vx: 0.004 * unit,
        vy: 0,
        a: 0.25 + rnd() * 0.6,
        tw: 0.3 + rnd() * 1.4,
      }));
      this.nextShoot = 0;
    } else if (this.type === "glitter") {
      // Glitzer schwebt in alle Richtungen und blitzt immer wieder kurz auf
      this.particles = make([45, 75, 110][this.strength - 1], () => {
        const a = rnd() * Math.PI * 2;
        const v = (0.15 + rnd() * 0.35) * unit;
        return { r: (1.2 + rnd() * rnd() * 3.2) * unit * 1.4, vx: Math.cos(a) * v, vy: Math.sin(a) * v, a: 0.5 + rnd() * 0.5, tw: 0.8 + rnd() * 2.2 };
      });
    } else {
      this.particles = make([30, 48, 72][this.strength - 1], () => ({
        r: (0.6 + rnd() * rnd() * 2.2) * unit * 1.4,
        vx: (rnd() - 0.5) * 0.12 * unit,
        vy: -(0.08 + rnd() * 0.22) * unit,
        a: 0.12 + rnd() * 0.38,
        tw: 0.2 + rnd() * 0.6,
      }));
    }
    cancelAnimationFrame(this.raf);
    if (reducedMotion()) this.draw(0);
    else this.raf = requestAnimationFrame(this.frame);
  }

  private sizeCanvas(): void {
    const c = this.canvas;
    if (!c) return;
    // Die Bühne ist 1280 px breit und wird skaliert – etwas Reserve für scharfe Punkte
    const scale = Math.min(1.5, window.devicePixelRatio || 1);
    const w = Math.round(this.offsetWidth * scale);
    const h = Math.round(this.offsetHeight * scale);
    if (w && h && (c.width !== w || c.height !== h)) {
      const fx = c.width ? w / c.width : 1;
      const fy = c.height ? h / c.height : 1;
      c.width = w;
      c.height = h;
      for (const p of this.particles) {
        p.x *= fx;
        p.y *= fy;
      }
    }
  }

  private frame = (t: number): void => {
    this.raf = requestAnimationFrame(this.frame);
    if (t - this.last < 33) return; // ~30 Bilder pro Sekunde reichen
    const dt = this.last ? Math.min(3, (t - this.last) / 33) : 1;
    this.last = t;
    const k = this.speed === "normal" ? 1.8 : 1;
    const c = this.canvas;
    if (!c) return;
    if (FX[this.type]) {
      this.draw(t, dt * k);
      return;
    }
    // Schnee treibt seitlich stärker hin und her als die aufsteigenden Partikel
    const sway = this.type === "snow" ? 0.35 : this.type === "stars" ? 0 : this.type === "glitter" ? 0.12 : 0.05;
    for (const p of this.particles) {
      p.x += (p.vx + Math.sin(t / 4000 + p.ph) * sway) * dt * k;
      p.y += p.vy * dt * k;
      if (p.y < -10) p.y = c.height + 10;
      if (p.y > c.height + 10) p.y = -10;
      if (p.x < -10) p.x = c.width + 10;
      if (p.x > c.width + 10) p.x = -10;
    }
    this.draw(t);
  };

  private fxRnd = random(29);

  private fxContext(c: HTMLCanvasElement, t: number, dt: number) {
    const ctx = c.getContext("2d")!;
    return { ctx, w: c.width, h: c.height, u: c.width / 1280, t, dt, k: 1, strength: this.strength, rgb: this.color, rnd: this.fxRnd };
  }

  private draw(t: number, dt = 0): void {
    const c = this.canvas;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    // Farbe vom Stil: helle Punkte im dunklen, dunkle im hellen Stil – einmal pro Sekunde nachsehen
    if (!t || t - this.colorAt > 1000) {
      this.colorAt = t || 1;
      // Glitzer in Akzentfarbe, Zeichenregen klassisch grün, sonst Schriftfarbe – eigene Farbe geht vor
      const ink =
        this.tint ||
        (this.type === "glitter" ? getComputedStyle(this).getPropertyValue("--af-accent").trim() : (this.type as string) === "matrix" ? "#46ff8c" : getComputedStyle(this).getPropertyValue("--af-ink").trim());
      const hex = ink.match(/^#([0-9a-f]{6})$/i);
      if (hex) this.color = [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).join(",");
      else if (ink.startsWith("rgb")) this.color = ink.replace(/rgba?\(|\)/g, "").split(",").slice(0, 3).join(",");
      else if (ink) {
        // andere Schreibweisen (hsl, Farbnamen): der Canvas rechnet sie in #rrggbb um
        ctx.fillStyle = "#000";
        ctx.fillStyle = ink;
        const m = String(ctx.fillStyle).match(/^#([0-9a-f]{6})$/i);
        if (m) this.color = [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16)).join(",");
      }
    }
    const fx = FX[this.type];
    if (fx) {
      if (fx.trails && t) {
        // Spuren: das alte Bild nur teilweise wegnehmen
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = `rgba(0,0,0,${fx.trails * Math.max(1, dt)})`;
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.globalCompositeOperation = "source-over";
      } else ctx.clearRect(0, 0, c.width, c.height);
      fx.draw({ ...this.fxContext(c, t, dt), k: 1 }, this.fxState);
      return;
    }
    ctx.clearRect(0, 0, c.width, c.height);
    const boost = [0.8, 1, 1.2][this.strength - 1];
    // Schnee flackert nicht, Sterne funkeln deutlicher
    const flicker = this.type === "snow" ? 0.1 : this.type === "stars" ? 0.55 : 0.4;
    if (this.type === "glitter") {
      this.drawGlitter(ctx, t, boost);
      return;
    }
    for (const p of this.particles) {
      const a = p.a * boost * (1 - flicker + flicker * Math.sin((t / 1000) * p.tw + p.ph));
      ctx.fillStyle = `rgba(${this.color},${Math.max(0, Math.min(1, a))})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    if (this.type === "stars" && t) this.drawShootingStar(ctx, c, t);
  }

  /** Glitzer: kleine Punkte, die beim Aufblitzen zu einem Vierstrahl-Funkeln mit Schein werden */
  private drawGlitter(ctx: CanvasRenderingContext2D, t: number, boost: number): void {
    for (const p of this.particles) {
      // meist dezent, kurze helle Blitze (sin hoch 8)
      const flash = Math.max(0, Math.sin((t / 1000) * p.tw + p.ph)) ** 8;
      const a = Math.min(1, p.a * boost * (0.35 + 0.65 * flash));
      ctx.fillStyle = `rgba(${this.color},${a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2);
      ctx.fill();
      if (flash < 0.15) continue;
      const len = p.r * (2 + 4 * flash);
      ctx.strokeStyle = `rgba(${this.color},${a * flash})`;
      ctx.lineWidth = Math.max(0.8, p.r * 0.35);
      ctx.beginPath();
      ctx.moveTo(p.x - len, p.y);
      ctx.lineTo(p.x + len, p.y);
      ctx.moveTo(p.x, p.y - len);
      ctx.lineTo(p.x, p.y + len);
      ctx.stroke();
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, len);
      g.addColorStop(0, `rgba(${this.color},${0.35 * flash})`);
      g.addColorStop(1, `rgba(${this.color},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, len, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /** Alle 25–60 s eine kurze Sternschnuppe (etwa 1 s) */
  private drawShootingStar(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement, t: number): void {
    if (!this.nextShoot) this.nextShoot = t + 8000 + Math.random() * 20000;
    if (!this.shoot && t > this.nextShoot) {
      const len = c.width * (0.12 + Math.random() * 0.1);
      this.shoot = { t, x: c.width * (0.2 + Math.random() * 0.6), y: c.height * Math.random() * 0.35, dx: len, dy: len * 0.35 };
    }
    const s = this.shoot;
    if (!s) return;
    const p = (t - s.t) / 1100;
    if (p >= 1) {
      this.shoot = undefined;
      this.nextShoot = t + 25000 + Math.random() * 35000;
      return;
    }
    const hx = s.x + s.dx * p;
    const hy = s.y + s.dy * p;
    const g = ctx.createLinearGradient(hx - s.dx * 0.5, hy - s.dy * 0.5, hx, hy);
    g.addColorStop(0, `rgba(${this.color},0)`);
    g.addColorStop(1, `rgba(${this.color},${0.8 * Math.sin(Math.PI * p)})`);
    ctx.strokeStyle = g;
    ctx.lineWidth = Math.max(1, c.width / 1280) * 1.4;
    ctx.beginPath();
    ctx.moveTo(hx - s.dx * 0.5, hy - s.dy * 0.5);
    ctx.lineTo(hx, hy);
    ctx.stroke();
  }

  /* ───────── Darstellung ───────── */

  private renderBokeh() {
    const rnd = random(5);
    const count = this.small ? 6 : [8, 12, 16][this.strength - 1];
    const peak = [0.45, 0.6, 0.75][this.strength - 1];
    return html`<div class="layer bokeh">
      ${Array.from({ length: count }, (_, i) => {
        const size = 60 + rnd() * 180;
        const color = i % 3 === 0 ? "var(--af-ink)" : "var(--af-accent)";
        const style = [
          `left:${rnd() * 100 - 8}%`,
          `top:${rnd() * 100 - 8}%`,
          `width:${size}px`,
          `--c:color-mix(in srgb, ${color} ${i % 3 === 0 ? 14 : 26}%, transparent)`,
          `--d:${22 + rnd() * 26}s`,
          `--delay:${-rnd() * 40}s`,
          `--o:${peak * (0.5 + rnd() * 0.5)}`,
          `--dx:${(rnd() - 0.5) * 80}px`,
          `--dy:${(rnd() - 0.5) * 60}px`,
        ].join(";");
        return html`<i style=${style}></i>`;
      })}
    </div>`;
  }

  private renderRain() {
    const rnd = random(17);
    // jeder Tropfen ist eine Linse mit Unschärfe – teuer; daher eher wenige, dafür gut sichtbare
    const count = this.small ? 8 : [16, 26, 40][this.strength - 1];
    return html`<div class="layer rain">
      ${Array.from({ length: count }, (_, i) => {
        const size = 14 + rnd() * rnd() * 46;
        const run = i % 4 === 0;
        const style = [
          `left:${rnd() * 100}%`,
          `top:${run ? rnd() * 40 : rnd() * 100}%`,
          `width:${size}px`,
          `height:${size * 1.08}px`,
          `--d:${run ? 5 + rnd() * 6 : 6 + rnd() * 10}s`,
          `--delay:${-rnd() * 16}s`,
        ].join(";");
        return html`<i class=${run ? "run" : ""} style=${style}></i>`;
      })}
    </div>`;
  }

  private renderLava(style: string) {
    const rnd = random(23);
    const colors = ["var(--af-accent)", "var(--af-alert)", "var(--af-cold)", "var(--af-accent)", "var(--af-good)"];
    return html`<div class="layer lava" style=${style}>
      ${colors.map((c, i) => {
        const w = 18 + rnd() * 22;
        return html`<i
          style="left:${rnd() * 85}%;width:${w}%;aspect-ratio:1;--c:color-mix(in srgb, ${c} 45%, transparent);--d:${30 + rnd() * 30}s;--delay:${-rnd() * 40}s;--s:${0.7 + rnd() * 0.6};opacity:${0.5 + i * 0.05}"
        ></i>`;
      })}
    </div>`;
  }

  private renderWaves(style: string) {
    const wave = (cls: string, fill: string, amp: number) =>
      html`<svg class=${cls} viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0 ${50 - amp} Q150 ${50 + amp} 300 ${50 - amp} T600 ${50 - amp} T900 ${50 - amp} T1200 ${50 - amp} V100 H0 Z" fill=${fill} />
      </svg>`;
    return html`<div class="layer waves" style=${style}>
      ${wave("w1", "color-mix(in srgb, var(--af-cold) 18%, transparent)", 14)} ${wave("w2", "color-mix(in srgb, var(--af-accent) 14%, transparent)", 10)}
      ${wave("w3", "color-mix(in srgb, var(--af-cold) 22%, transparent)", 8)}
    </div>`;
  }

  private renderClouds(style: string) {
    const rnd = random(31);
    const count = this.small ? 3 : [4, 6, 8][this.strength - 1];
    return html`<div class="layer clouds" style=${style}>
      ${Array.from(
        { length: count },
        () => html`<i style="top:${rnd() * 60}%;--w:${30 + rnd() * 30}vw;--d:${90 + rnd() * 90}s;--delay:${-rnd() * 180}s"></i>`,
      )}
    </div>`;
  }

  private renderFire(style: string) {
    const rnd = random(37);
    const count = this.small ? 6 : [12, 20, 32][this.strength - 1];
    return html`<div class="layer fire" style=${style}>
      <div class="glow"></div>
      <div class="glow g2"></div>
      ${Array.from(
        { length: count },
        () => html`<i class="ember" style="left:${20 + rnd() * 60}%;--d:${4 + rnd() * 5}s;--delay:${-rnd() * 9}s;--dx:${(rnd() - 0.5) * 120}px"></i>`,
      )}
    </div>`;
  }

  render() {
    const k = this.speed === "normal" ? 0.55 : 1;
    const opacity = [0.6, 0.85, 1][this.strength - 1];
    const style = `--k:${k};opacity:${opacity}`;
    switch (this.type) {
      case "raindrops":
        return this.renderRain();
      case "lava":
        return this.renderLava(style);
      case "waves":
        return this.renderWaves(style);
      case "clouds":
        return this.renderClouds(style);
      case "fire":
        return this.renderFire(style);
      case "hue":
        return html`<div class="layer hue" style=${style}></div>`;
      case "aurora":
        return html`<div class="layer aurora" style=${style}><i class="a1"></i><i class="a2"></i><i class="a3"></i></div>`;
      case "flow":
        return html`<div class="layer flow" style=${style}><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;
      case "bokeh":
        return html`<div class="layer" style="--k:${k}">${this.renderBokeh()}</div>`;
      case "mist":
        return html`<div class="layer mist" style="${style};--m1:${MIST_1};--m2:${MIST_2}"><div class="layer m1"></div><div class="layer m2"></div></div>`;
      default:
        return CANVAS.has(this.type) ? html`<canvas></canvas>` : nothing;
    }
  }
}

define("af-ambient", AfAmbient);
