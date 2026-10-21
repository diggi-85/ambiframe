// Hintergrund-Animationen einer Seite: Partikel, fließender Verlauf, Lichtschimmer, Nebel – sehr ruhig
import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import type { AmbientKind } from "../types";
import { define } from "../widgets/base";

export interface AmbientSettings {
  type: AmbientKind;
  strength: 1 | 2 | 3;
  speed: "slow" | "normal";
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

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export class AfAmbient extends LitElement {
  static properties = {
    type: {},
    strength: { type: Number },
    speed: {},
    small: { type: Boolean },
  };

  type: AmbientKind = "none";
  strength: 1 | 2 | 3 = 1;
  speed: "slow" | "normal" = "slow";
  /** Kleine Vorschau im Editor: weniger Teilchen */
  small = false;

  private raf = 0;
  private particles: Particle[] = [];
  private color = "255,255,255";
  private colorAt = 0;
  private last = 0;
  private resize?: ResizeObserver;

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

    @media (prefers-reduced-motion: reduce) {
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
    if (!document.hidden && this.type === "particles" && !reducedMotion()) this.raf = requestAnimationFrame(this.frame);
  };

  protected updated(changed: PropertyValues): void {
    if (this.type !== "particles") {
      cancelAnimationFrame(this.raf);
      return;
    }
    if (changed.has("type") || changed.has("strength") || changed.has("small")) this.setupParticles();
  }

  /* ───────── Partikel (Canvas, 30 Bilder/s) ───────── */

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
    const count = this.small ? 16 : [30, 48, 72][this.strength - 1];
    const w = c.width;
    const h = c.height;
    const unit = w / 1280;
    this.particles = Array.from({ length: count }, () => ({
      x: rnd() * w,
      y: rnd() * h,
      r: (0.6 + rnd() * rnd() * 2.2) * unit * 1.4,
      vx: (rnd() - 0.5) * 0.12 * unit,
      vy: -(0.08 + rnd() * 0.22) * unit,
      a: 0.12 + rnd() * 0.38,
      ph: rnd() * Math.PI * 2,
      tw: 0.2 + rnd() * 0.6,
    }));
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
    for (const p of this.particles) {
      p.x += (p.vx + Math.sin(t / 4000 + p.ph) * 0.05) * dt * k;
      p.y += p.vy * dt * k;
      if (p.y < -10) p.y = c.height + 10;
      if (p.x < -10) p.x = c.width + 10;
      if (p.x > c.width + 10) p.x = -10;
    }
    this.draw(t);
  };

  private draw(t: number): void {
    const c = this.canvas;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    // Farbe vom Stil: helle Punkte im dunklen, dunkle im hellen Stil – einmal pro Sekunde nachsehen
    if (!t || t - this.colorAt > 1000) {
      this.colorAt = t;
      const ink = getComputedStyle(this).getPropertyValue("--af-ink").trim();
      const hex = ink.match(/^#([0-9a-f]{6})$/i);
      if (hex) this.color = [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).join(",");
      else if (ink.startsWith("rgb")) this.color = ink.replace(/rgba?\(|\)/g, "").split(",").slice(0, 3).join(",");
    }
    ctx.clearRect(0, 0, c.width, c.height);
    const boost = [0.8, 1, 1.2][this.strength - 1];
    for (const p of this.particles) {
      const a = p.a * boost * (0.6 + 0.4 * Math.sin((t / 1000) * p.tw + p.ph));
      ctx.fillStyle = `rgba(${this.color},${Math.max(0, Math.min(1, a))})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
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

  render() {
    const k = this.speed === "normal" ? 0.55 : 1;
    const opacity = [0.6, 0.85, 1][this.strength - 1];
    const style = `--k:${k};opacity:${opacity}`;
    switch (this.type) {
      case "particles":
        return html`<canvas></canvas>`;
      case "flow":
        return html`<div class="layer flow" style=${style}><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="b4"></i></div>`;
      case "bokeh":
        return html`<div class="layer" style="--k:${k}">${this.renderBokeh()}</div>`;
      case "mist":
        return html`<div class="layer mist" style="${style};--m1:${MIST_1};--m2:${MIST_2}"><div class="layer m1"></div><div class="layer m2"></div></div>`;
      default:
        return nothing;
    }
  }
}

define("af-ambient", AfAmbient);
