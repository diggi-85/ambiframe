// Weitere Canvas-Effekte für den Hintergrund: Natur (Glühwürmchen, Blätter, Blüten, Blasen, Wind), Bildschirmschoner
// (Zeichenregen, Sternenflug, Linien, springendes Logo, Rohre) und Anlässe (Konfetti, Feuerwerk, Herzen).
// Jeder Effekt hat einen Startzustand und eine Zeichenfunktion für ein Bild (~30 pro Sekunde).

export interface FxContext {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Maßstab: Breite / 1280 */
  u: number;
  /** Zeit in ms und Schritt (1 ≈ 33 ms) */
  t: number;
  dt: number;
  /** Tempo (1 = langsam, 1.8 = normal) und Stärke 1–3 */
  k: number;
  strength: number;
  /** Farbe als „r,g,b“ (Schrift des Stils oder eigene Farbe) */
  rgb: string;
  rnd: () => number;
}

export interface Fx {
  /** Zustand anlegen; n = Anzahl je Stärke (kleiner in der Editor-Vorschau) */
  init: (c: FxContext, n: number) => unknown;
  draw: (c: FxContext, state: any) => void;
  /** Spuren lassen: das letzte Bild nur zum Teil löschen (Anteil je Bild) */
  trails?: number;
  counts: [number, number, number];
}

const TAU = Math.PI * 2;
const hsl = (h: number, s = 80, l = 60, a = 1) => `hsla(${h % 360},${s}%,${l}%,${a})`;

interface Mover {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  ph: number;
  rot: number;
  vr: number;
  hue: number;
}

const movers = (c: FxContext, n: number, f: () => Partial<Mover>): Mover[] =>
  Array.from({ length: n }, () => ({ x: c.rnd() * c.w, y: c.rnd() * c.h, vx: 0, vy: 0, r: 1, a: 1, ph: c.rnd() * TAU, rot: c.rnd() * TAU, vr: 0, hue: 0, ...f() }));

/** Was rausfliegt, kommt auf der anderen Seite wieder */
const wrap = (m: Mover, c: FxContext, pad = 30) => {
  if (m.x < -pad) m.x = c.w + pad;
  if (m.x > c.w + pad) m.x = -pad;
  if (m.y < -pad) m.y = c.h + pad;
  if (m.y > c.h + pad) m.y = -pad;
};

const LEAF_HUES = [28, 18, 38, 8, 45];

/** Blatt oder Blütenblatt: dreht und wendet sich beim Fallen */
const leaf = (c: FxContext, m: Mover, color: string, petal: boolean) => {
  const { ctx } = c;
  ctx.save();
  ctx.translate(m.x, m.y);
  ctx.rotate(m.rot);
  ctx.scale(1, Math.cos(m.rot * 1.7 + m.ph) * 0.8 + 0.2);
  ctx.fillStyle = color;
  ctx.beginPath();
  if (petal) ctx.ellipse(0, 0, m.r, m.r * 0.62, 0, 0, TAU);
  else {
    ctx.moveTo(-m.r, 0);
    ctx.quadraticCurveTo(0, -m.r * 0.7, m.r, 0);
    ctx.quadraticCurveTo(0, m.r * 0.7, -m.r, 0);
  }
  ctx.fill();
  if (!petal) {
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = Math.max(0.6, m.r * 0.06);
    ctx.beginPath();
    ctx.moveTo(-m.r, 0);
    ctx.lineTo(m.r, 0);
    ctx.stroke();
  }
  ctx.restore();
};

const heart = (ctx: CanvasRenderingContext2D, x: number, y: number, s: number) => {
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.3);
  ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.8, x, y + s);
  ctx.bezierCurveTo(x, y + s * 0.8, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
  ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
  ctx.fill();
};

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  hue: number;
}
interface Pipe {
  x: number;
  y: number;
  dir: number;
  hue: number;
  acc: number;
}
interface Seg {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  hue: number;
}
const DIRS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
/** Abbiegen: waagerecht → senkrecht und umgekehrt */
const TURNS = [
  [1, 3],
  [0, 2],
  [1, 3],
  [0, 2],
];
const newPipe = (c: FxContext, i: number): Pipe => {
  const step = 34 * c.u;
  return {
    x: Math.round((c.rnd() * c.w) / step) * step,
    y: Math.round((c.rnd() * c.h) / step) * step,
    dir: Math.floor(c.rnd() * 4),
    hue: (i * 137 + c.rnd() * 60) % 360,
    acc: 0,
  };
};

export const FX: Record<string, Fx> = {
  /* ───── Natur ───── */
  fireflies: {
    counts: [18, 30, 48],
    init: (c, n) => movers(c, n, () => ({ r: (1.6 + c.rnd() * 1.8) * c.u * 1.4, hue: 70 + c.rnd() * 25, vr: 0.3 + c.rnd() * 0.5 })),
    draw: (c, s: Mover[]) => {
      const { ctx } = c;
      for (const m of s) {
        // umherirren: die Richtung ändert sich langsam
        m.x += Math.cos(c.t / 3000 + m.ph) * 0.35 * c.u * c.dt * c.k;
        m.y += Math.sin(c.t / 2300 + m.ph * 1.3) * 0.25 * c.u * c.dt * c.k;
        wrap(m, c);
        const glow = Math.max(0, Math.sin((c.t / 1000) * m.vr + m.ph)) ** 2;
        if (glow < 0.02) continue;
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 7);
        g.addColorStop(0, hsl(m.hue, 100, 70, 0.9 * glow));
        g.addColorStop(0.25, hsl(m.hue, 100, 60, 0.35 * glow));
        g.addColorStop(1, hsl(m.hue, 100, 50, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 7, 0, TAU);
        ctx.fill();
      }
    },
  },
  leaves: {
    counts: [14, 24, 38],
    init: (c, n) =>
      movers(c, n, () => ({
        r: (7 + c.rnd() * 9) * c.u * 1.3,
        vy: (0.5 + c.rnd() * 0.7) * c.u,
        vx: (0.2 + c.rnd() * 0.4) * c.u,
        vr: (c.rnd() - 0.5) * 0.04,
        hue: LEAF_HUES[Math.floor(c.rnd() * LEAF_HUES.length)],
      })),
    draw: (c, s: Mover[]) => {
      for (const m of s) {
        m.x += (m.vx + Math.sin(c.t / 1400 + m.ph) * 0.9 * c.u) * c.dt * c.k;
        m.y += m.vy * c.dt * c.k;
        m.rot += m.vr * c.dt * c.k;
        wrap(m, c);
        leaf(c, m, hsl(m.hue, 70, 45, 0.85), false);
      }
    },
  },
  blossoms: {
    counts: [24, 40, 60],
    init: (c, n) =>
      movers(c, n, () => ({
        r: (3.5 + c.rnd() * 4) * c.u * 1.3,
        vy: (0.35 + c.rnd() * 0.5) * c.u,
        vx: (0.35 + c.rnd() * 0.5) * c.u,
        vr: (c.rnd() - 0.5) * 0.06,
        hue: 330 + c.rnd() * 25,
        a: 0.6 + c.rnd() * 0.35,
      })),
    draw: (c, s: Mover[]) => {
      for (const m of s) {
        m.x += (m.vx + Math.sin(c.t / 1100 + m.ph) * 0.6 * c.u) * c.dt * c.k;
        m.y += m.vy * c.dt * c.k;
        m.rot += m.vr * c.dt * c.k;
        wrap(m, c);
        leaf(c, m, hsl(m.hue, 80, 86, m.a), true);
      }
    },
  },
  bubbles: {
    counts: [14, 24, 36],
    init: (c, n) => movers(c, n, () => ({ r: (6 + c.rnd() * c.rnd() * 26) * c.u * 1.3, vy: -(0.25 + c.rnd() * 0.5) * c.u, a: 0.25 + c.rnd() * 0.35 })),
    draw: (c, s: Mover[]) => {
      const { ctx } = c;
      for (const m of s) {
        m.x += Math.sin(c.t / 1200 + m.ph) * 0.3 * c.u * c.dt * c.k;
        // kleine Blasen steigen schneller
        m.y += m.vy * c.dt * c.k * (1 + 10 / (m.r + 10));
        wrap(m, c, m.r + 10);
        ctx.strokeStyle = `rgba(${c.rgb},${m.a})`;
        ctx.lineWidth = Math.max(1, m.r * 0.06);
        ctx.fillStyle = `rgba(${c.rgb},${m.a * 0.12})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, TAU);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, m.a * 1.4)})`;
        ctx.beginPath();
        ctx.ellipse(m.x - m.r * 0.38, m.y - m.r * 0.42, m.r * 0.22, m.r * 0.12, -0.6, 0, TAU);
        ctx.fill();
      }
    },
  },
  wind: {
    counts: [10, 16, 24],
    init: (c, n) => ({
      gusts: movers(c, n, () => ({ r: (120 + c.rnd() * 260) * c.u, vx: (6 + c.rnd() * 8) * c.u, a: 0.1 + c.rnd() * 0.14 })),
      bits: movers(c, Math.round(n * 0.7), () => ({
        r: (4 + c.rnd() * 5) * c.u * 1.3,
        vx: (5 + c.rnd() * 6) * c.u,
        vr: 0.08 + c.rnd() * 0.1,
        hue: LEAF_HUES[Math.floor(c.rnd() * LEAF_HUES.length)],
      })),
    }),
    draw: (c, s: { gusts: Mover[]; bits: Mover[] }) => {
      const { ctx } = c;
      // Böen: geschwungene Linien ziehen vorbei, dazwischen wirbeln Blätter
      ctx.lineCap = "round";
      for (const m of s.gusts) {
        m.x += m.vx * c.dt * c.k;
        if (m.x - m.r > c.w) {
          m.x = -m.r * 2 * c.rnd();
          m.y = c.rnd() * c.h;
        }
        ctx.strokeStyle = `rgba(${c.rgb},${m.a})`;
        ctx.lineWidth = Math.max(1, 1.6 * c.u);
        ctx.beginPath();
        for (let i = 0; i <= 20; i++) {
          const px = m.x - m.r + (i / 20) * m.r;
          const py = m.y + Math.sin(i / 3 + m.ph + c.t / 500) * 6 * c.u;
          if (i) ctx.lineTo(px, py);
          else ctx.moveTo(px, py);
        }
        ctx.stroke();
      }
      for (const m of s.bits) {
        m.x += m.vx * c.dt * c.k;
        m.y += Math.sin(c.t / 300 + m.ph) * 1.2 * c.u * c.dt;
        m.rot += m.vr * c.dt * c.k;
        wrap(m, c);
        leaf(c, m, hsl(m.hue, 65, 45, 0.75), false);
      }
    },
  },

  /* ───── Bildschirmschoner (kräftiger) ───── */
  matrix: {
    counts: [40, 60, 90],
    trails: 0.09,
    init: (c, n) => Array.from({ length: n }, () => ({ x: c.rnd() * c.w, y: c.rnd() * c.h, v: (4 + c.rnd() * 7) * c.u, s: (14 + c.rnd() * 8) * c.u })),
    draw: (c, s: { x: number; y: number; v: number; s: number }[]) => {
      const { ctx } = c;
      const chars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789";
      for (const col of s) {
        col.y += col.v * c.dt * c.k;
        if (col.y > c.h + 40) {
          col.y = -40;
          col.x = c.rnd() * c.w;
        }
        ctx.font = `${col.s}px monospace`;
        ctx.fillStyle = `rgba(${c.rgb},0.9)`;
        ctx.fillText(chars[Math.floor(c.rnd() * chars.length)], col.x, col.y);
      }
    },
  },
  warp: {
    counts: [120, 200, 320],
    init: (c, n) => Array.from({ length: n }, () => ({ a: c.rnd() * TAU, d: c.rnd(), v: 0.004 + c.rnd() * 0.01 })),
    draw: (c, s: { a: number; d: number; v: number }[]) => {
      const { ctx } = c;
      const cx = c.w / 2;
      const cy = c.h / 2;
      const max = Math.hypot(cx, cy);
      ctx.lineCap = "round";
      for (const st of s) {
        const d0 = st.d;
        // nach außen immer schneller
        st.d += st.v * (0.3 + st.d * 2) * c.dt * c.k;
        if (st.d > 1.1) {
          st.d = c.rnd() * 0.05;
          st.a = c.rnd() * TAU;
          continue;
        }
        const r0 = d0 * d0 * max;
        const r1 = st.d * st.d * max;
        ctx.strokeStyle = `rgba(${c.rgb},${Math.min(1, st.d * 1.4)})`;
        ctx.lineWidth = Math.max(0.6, st.d * 2.6 * c.u);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(st.a) * r0, cy + Math.sin(st.a) * r0);
        ctx.lineTo(cx + Math.cos(st.a) * r1, cy + Math.sin(st.a) * r1);
        ctx.stroke();
      }
    },
  },
  mystify: {
    counts: [1, 2, 3],
    trails: 0.06,
    init: (c, n) =>
      Array.from({ length: n }, (_, i) => ({
        hue: i * 120,
        pts: Array.from({ length: 4 }, () => ({ x: c.rnd() * c.w, y: c.rnd() * c.h, vx: (c.rnd() - 0.5) * 7 * c.u, vy: (c.rnd() - 0.5) * 7 * c.u })),
      })),
    draw: (c, s: { hue: number; pts: { x: number; y: number; vx: number; vy: number }[] }[]) => {
      const { ctx } = c;
      for (const poly of s) {
        poly.hue += 0.3 * c.dt;
        for (const p of poly.pts) {
          p.x += p.vx * c.dt * c.k * 0.6;
          p.y += p.vy * c.dt * c.k * 0.6;
          if (p.x < 0 || p.x > c.w) p.vx *= -1;
          if (p.y < 0 || p.y > c.h) p.vy *= -1;
        }
        ctx.strokeStyle = hsl(poly.hue, 90, 62, 0.9);
        ctx.lineWidth = 1.6 * c.u;
        ctx.beginPath();
        poly.pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
        ctx.closePath();
        ctx.stroke();
      }
    },
  },
  logo: {
    counts: [1, 1, 1],
    init: (c) => ({ x: c.w * 0.3, y: c.h * 0.3, vx: 2.2 * c.u, vy: 1.7 * c.u, hue: 200 }),
    draw: (c, s: { x: number; y: number; vx: number; vy: number; hue: number }) => {
      const { ctx } = c;
      const h = 90 * c.u;
      const w = h + 230 * c.u;
      s.x += s.vx * c.dt * c.k;
      s.y += s.vy * c.dt * c.k;
      // an der Wand abprallen und dabei die Farbe wechseln
      if (s.x < 0 || s.x + w > c.w) {
        s.vx *= -1;
        s.x = Math.max(0, Math.min(c.w - w, s.x));
        s.hue += 67;
      }
      if (s.y < 0 || s.y + h > c.h) {
        s.vy *= -1;
        s.y = Math.max(0, Math.min(c.h - h, s.y));
        s.hue += 67;
      }
      ctx.strokeStyle = ctx.fillStyle = hsl(s.hue, 85, 62, 0.9);
      ctx.lineWidth = 5 * c.u;
      ctx.beginPath();
      ctx.roundRect(s.x, s.y, h, h, 10 * c.u);
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(s.x + h * 0.22, s.y + h * 0.22, h * 0.56, h * 0.56, 4 * c.u);
      ctx.stroke();
      ctx.font = `700 ${34 * c.u}px system-ui, sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillText("Ambiframe", s.x + h + 14 * c.u, s.y + h / 2);
    },
  },
  pipes: {
    counts: [1, 2, 3],
    init: (c, n) => ({ pipes: Array.from({ length: n }, (_, i) => newPipe(c, i)), segs: [] as Seg[], fade: 0 }),
    draw: (c, s: { pipes: Pipe[]; segs: Seg[]; fade: number }) => {
      const { ctx } = c;
      const step = 34 * c.u;
      // ist der Bildschirm voll, langsam ausblenden und neu anfangen
      if (s.segs.length > 260 * s.pipes.length) s.fade = Math.min(1, s.fade + 0.02 * c.dt);
      if (s.fade >= 1) {
        s.segs = [];
        s.fade = 0;
        s.pipes = s.pipes.map((_, i) => newPipe(c, i));
      }
      if (!s.fade)
        for (const p of s.pipes) {
          p.acc += 0.5 * c.dt * c.k;
          while (p.acc > 1) {
            p.acc -= 1;
            if (c.rnd() < 0.25) p.dir = TURNS[p.dir][Math.floor(c.rnd() * 2)];
            const [dx, dy] = DIRS[p.dir];
            const nx = p.x + dx * step;
            const ny = p.y + dy * step;
            if (nx < 0 || ny < 0 || nx > c.w || ny > c.h) {
              p.dir = TURNS[p.dir][Math.floor(c.rnd() * 2)];
              continue;
            }
            s.segs.push({ x0: p.x, y0: p.y, x1: nx, y1: ny, hue: p.hue });
            p.x = nx;
            p.y = ny;
          }
        }
      const r = 7 * c.u;
      ctx.globalAlpha = 1 - s.fade;
      for (const g of s.segs) {
        // Rohr mit Licht von oben links: Verlauf quer zur Richtung
        const grad = g.y0 === g.y1 ? ctx.createLinearGradient(0, g.y0 - r, 0, g.y0 + r) : ctx.createLinearGradient(g.x0 - r, 0, g.x0 + r, 0);
        grad.addColorStop(0, hsl(g.hue, 70, 30));
        grad.addColorStop(0.35, hsl(g.hue, 80, 72));
        grad.addColorStop(1, hsl(g.hue, 70, 22));
        ctx.strokeStyle = grad;
        ctx.lineWidth = r * 2;
        ctx.lineCap = "butt";
        ctx.beginPath();
        ctx.moveTo(g.x0, g.y0);
        ctx.lineTo(g.x1, g.y1);
        ctx.stroke();
        const ball = ctx.createRadialGradient(g.x1 - r * 0.4, g.y1 - r * 0.4, r * 0.1, g.x1, g.y1, r * 1.3);
        ball.addColorStop(0, hsl(g.hue, 80, 80));
        ball.addColorStop(1, hsl(g.hue, 70, 25));
        ctx.fillStyle = ball;
        ctx.beginPath();
        ctx.arc(g.x1, g.y1, r * 1.25, 0, TAU);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
  },

  /* ───── Anlässe ───── */
  confetti: {
    counts: [70, 120, 180],
    init: (c, n) =>
      movers(c, n, () => ({
        y: -c.rnd() * c.h,
        r: (5 + c.rnd() * 5) * c.u * 1.3,
        vy: (1.2 + c.rnd() * 1.8) * c.u,
        vr: (c.rnd() - 0.5) * 0.25,
        hue: c.rnd() * 360,
      })),
    draw: (c, s: Mover[]) => {
      const { ctx } = c;
      for (const m of s) {
        m.x += Math.sin(c.t / 500 + m.ph) * 0.8 * c.u * c.dt;
        m.y += m.vy * c.dt * c.k;
        m.rot += m.vr * c.dt * c.k;
        if (m.y > c.h + 20) {
          m.y = -20;
          m.x = c.rnd() * c.w;
        }
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rot);
        ctx.scale(1, Math.cos(m.rot * 2.3));
        ctx.fillStyle = hsl(m.hue, 85, 60);
        ctx.fillRect(-m.r / 2, -m.r / 4, m.r, m.r / 2);
        ctx.restore();
      }
    },
  },
  fireworks: {
    counts: [3, 5, 7],
    trails: 0.12,
    init: (c, n) => ({ max: n, rockets: [] as Spark[], sparks: [] as Spark[], next: 0 }),
    draw: (c, s: { max: number; rockets: Spark[]; sparks: Spark[]; next: number }) => {
      const { ctx } = c;
      if (c.t > s.next && s.rockets.length < s.max) {
        s.rockets.push({ x: c.w * (0.15 + c.rnd() * 0.7), y: c.h, vx: (c.rnd() - 0.5) * 1.5 * c.u, vy: -(9 + c.rnd() * 4) * c.u, life: 1, hue: c.rnd() * 360 });
        s.next = c.t + 250 + c.rnd() * 700;
      }
      for (const r of s.rockets) {
        r.x += r.vx * c.dt;
        r.y += r.vy * c.dt;
        r.vy += 0.16 * c.u * c.dt;
        ctx.fillStyle = hsl(r.hue, 60, 85);
        ctx.fillRect(r.x, r.y, 2.5 * c.u, 6 * c.u);
        if (r.vy > -1.2 * c.u) {
          r.life = 0;
          // Explosion: Funken in alle Richtungen
          const n = 60 + Math.floor(c.rnd() * 40);
          for (let i = 0; i < n; i++) {
            const a = (i / n) * TAU;
            const v = (2 + c.rnd() * 3.5) * c.u;
            s.sparks.push({ x: r.x, y: r.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, hue: r.hue + (c.rnd() - 0.5) * 30 });
          }
        }
      }
      s.rockets = s.rockets.filter((r) => r.life > 0);
      for (const p of s.sparks) {
        p.x += p.vx * c.dt;
        p.y += p.vy * c.dt;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.05 * c.u * c.dt;
        p.life -= 0.008 * c.dt;
        ctx.fillStyle = hsl(p.hue, 90, 65, Math.max(0, p.life));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 * c.u, 0, TAU);
        ctx.fill();
      }
      s.sparks = s.sparks.filter((p) => p.life > 0);
    },
  },
  hearts: {
    counts: [16, 26, 40],
    init: (c, n) => movers(c, n, () => ({ r: (10 + c.rnd() * 18) * c.u * 1.2, vy: -(0.5 + c.rnd() * 0.8) * c.u, a: 0.35 + c.rnd() * 0.45, hue: 340 + c.rnd() * 30 })),
    draw: (c, s: Mover[]) => {
      const { ctx } = c;
      for (const m of s) {
        m.x += Math.sin(c.t / 900 + m.ph) * 0.5 * c.u * c.dt;
        m.y += m.vy * c.dt * c.k;
        wrap(m, c, m.r * 2);
        ctx.fillStyle = hsl(m.hue, 85, 62, m.a);
        heart(ctx, m.x, m.y, m.r);
      }
    },
  },
};

/** Welche Animation passt zum Wetter (Zustand einer weather.*-Entität) */
export const weatherAmbient = (state?: string): string => {
  switch (state) {
    case "snowy":
    case "snowy-rainy":
      return "snow";
    case "rainy":
    case "pouring":
    case "lightning-rainy":
      return "raindrops";
    case "windy":
    case "windy-variant":
    case "exceptional":
      return "wind";
    case "fog":
      return "mist";
    case "cloudy":
    case "partlycloudy":
      return "clouds";
    case "clear-night":
      return "stars";
    case "sunny":
      return "bokeh";
    default:
      return "none";
  }
};
