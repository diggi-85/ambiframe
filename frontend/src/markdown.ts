// Kleines, sicheres Markdown für Texte auf dem Ambiframe: erzeugt Lit-Vorlagen statt HTML, nichts wird als Code ausgeführt.
// Kann: # Überschriften, - Listen, 1. Listen, **fett**, *kursiv*, `Code`, --- Linie, [mdi:icon] und Leerzeilen als Absatz.
import { css, html, nothing, type TemplateResult } from "lit";
import { anyIcon } from "./icons";

const INLINE = /(\*\*[^*]+\*\*|__[^_]+__|\*[^*\s][^*]*\*|_[^_\s][^_]*_|`[^`]+`|\[mdi:[a-z0-9-]+\])/g;

const inline = (text: string): unknown[] =>
  text
    .split(INLINE)
    .filter((part) => part !== "")
    .map((part) => {
      if (/^(\*\*|__).+\1$/.test(part)) return html`<strong>${part.slice(2, -2)}</strong>`;
      if (/^`.+`$/.test(part)) return html`<code>${part.slice(1, -1)}</code>`;
      if (/^\[mdi:[a-z0-9-]+\]$/.test(part)) return anyIcon(part.slice(1, -1), "md-ic");
      if (/^([*_]).+\1$/.test(part)) return html`<em>${part.slice(1, -1)}</em>`;
      return part;
    });

type Block = { kind: "h"; level: number; text: string } | { kind: "p"; lines: string[] } | { kind: "ul" | "ol"; items: string[] } | { kind: "hr" };

export const markdown = (source: string): TemplateResult => {
  const blocks: Block[] = [];
  const last = () => blocks[blocks.length - 1];
  for (const raw of source.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    let m: RegExpMatchArray | null;
    if (!line.trim()) {
      blocks.push({ kind: "p", lines: [] });
    } else if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      blocks.push({ kind: "h", level: m[1].length, text: m[2] });
    } else if (/^\s*(---+|\*\*\*+)\s*$/.test(line)) {
      blocks.push({ kind: "hr" });
    } else if ((m = line.match(/^\s*[-*•]\s+(.*)$/))) {
      const b = last();
      if (b?.kind === "ul") b.items.push(m[1]);
      else blocks.push({ kind: "ul", items: [m[1]] });
    } else if ((m = line.match(/^\s*\d+[.)]\s+(.*)$/))) {
      const b = last();
      if (b?.kind === "ol") b.items.push(m[1]);
      else blocks.push({ kind: "ol", items: [m[1]] });
    } else {
      const b = last();
      if (b?.kind === "p") b.lines.push(line);
      else blocks.push({ kind: "p", lines: [line] });
    }
  }
  return html`<div class="md">
    ${blocks.map((b) => {
      switch (b.kind) {
        case "h":
          return b.level === 1
            ? html`<h1 class="display">${inline(b.text)}</h1>`
            : b.level === 2
              ? html`<h2 class="display">${inline(b.text)}</h2>`
              : html`<h3>${inline(b.text)}</h3>`;
        case "hr":
          return html`<hr />`;
        case "ul":
          return html`<ul>
            ${b.items.map((it) => html`<li>${inline(it)}</li>`)}
          </ul>`;
        case "ol":
          return html`<ol>
            ${b.items.map((it) => html`<li>${inline(it)}</li>`)}
          </ol>`;
        default:
          return b.lines.length ? html`<p>${b.lines.map((l, i) => html`${i ? html`<br />` : nothing}${inline(l)}`)}</p>` : nothing;
      }
    })}
  </div>`;
};

/** Abstände und Größen relativ zur Schriftgröße des Widgets */
export const markdownStyles = css`
  .md > :first-child {
    margin-top: 0;
  }
  .md > :last-child {
    margin-bottom: 0;
  }
  .md h1 {
    font-size: 2.1em;
    line-height: 1.05;
    margin: 0 0 0.4em;
    font-weight: var(--af-clock-weight);
  }
  .md h2 {
    font-size: 1.5em;
    line-height: 1.1;
    margin: 0.9em 0 0.35em;
    font-weight: var(--af-clock-weight);
  }
  .md h3 {
    font-size: 0.7em;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--af-ink-3);
    margin: 1.2em 0 0.5em;
  }
  .md p {
    margin: 0 0 0.7em;
  }
  .md ul,
  .md ol {
    margin: 0 0 0.7em;
    padding-left: 1.2em;
  }
  .md li {
    margin: 0.25em 0;
  }
  .md li::marker {
    color: var(--af-accent);
  }
  .md strong {
    color: var(--af-ink);
    font-weight: 600;
  }
  .md em {
    color: var(--af-accent);
    font-style: normal;
  }
  .md code {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 0.85em;
    background: var(--af-surface);
    padding: 0.1em 0.35em;
    border-radius: 6px;
  }
  .md hr {
    border: 0;
    border-top: 1px solid var(--af-line);
    margin: 0.9em 0;
  }
  .md .md-ic {
    width: 1.05em;
    height: 1.05em;
    vertical-align: -0.15em;
    color: var(--af-accent);
  }
`;
