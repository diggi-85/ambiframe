// Bedienmodus in der HA-App (iPad/iPhone): Das Dashboard lässt sich dort nicht einbetten – die App meldet nur die
// Hauptseite an, ein eingebettetes Dashboard bliebe leer bzw. bei der Anmeldung hängen. Stattdessen wechselt
// Ambiframe innerhalb von HA zum Dashboard und kehrt nach der Ruhezeit (oder per Taste) zurück. Läuft auf Modulebene,
// weil die Anzeige beim Wechsel abgebaut wird.
import { t } from "../i18n";

const ACTIVITY = ["pointerdown", "touchstart", "wheel", "keydown"] as const;

let active: { stop: () => void } | undefined;

const here = (): string => location.pathname + location.search;

/** Wie HAs eigenes navigate(): Adresse setzen und dem Frontend Bescheid geben */
const navigate = (path: string): void => {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
};

/** Zum Dashboard wechseln; nach `idle` s ohne Berührung (oder per Taste) zurück zu Ambiframe. */
export function leaveToDashboard(dashboard: string, idle: number): void {
  active?.stop();
  const back = here();
  let left = idle;

  const pill = document.createElement("button");
  pill.type = "button";
  pill.setAttribute(
    "style",
    [
      "position:fixed",
      "left:50%",
      "bottom:calc(16px + env(safe-area-inset-bottom, 0px))",
      "transform:translateX(-50%)",
      "z-index:2147483647",
      "border:0",
      "border-radius:999px",
      "padding:10px 18px",
      "font:500 15px/1.2 system-ui,-apple-system,sans-serif",
      "color:#fff",
      "background:rgba(20,20,20,.78)",
      "-webkit-backdrop-filter:blur(12px)",
      "backdrop-filter:blur(12px)",
      "box-shadow:0 6px 24px rgba(0,0,0,.25)",
      "cursor:pointer",
    ].join(";"),
  );
  const label = (): void => {
    pill.textContent = `← ${t("Zurück zu Ambiframe")} · ${left} s`;
  };
  const reset = (): void => {
    left = idle;
    label();
  };
  const stop = (): void => {
    clearInterval(tick);
    for (const type of ACTIVITY) window.removeEventListener(type, reset, true);
    window.removeEventListener("location-changed", onLocation);
    window.removeEventListener("popstate", onLocation);
    pill.remove();
    if (active?.stop === stop) active = undefined;
  };
  const finish = (): void => {
    stop();
    if (here() !== back) navigate(back);
  };
  // Selbst zurück zu Ambiframe gewechselt (z. B. über die Seitenleiste): nichts mehr zu tun
  const onLocation = (): void => {
    if (here() === back) stop();
  };
  const tick = window.setInterval(() => {
    left -= 1;
    if (left <= 0) finish();
    else label();
  }, 1000);

  pill.addEventListener("click", (e) => {
    e.stopPropagation();
    finish();
  });
  for (const type of ACTIVITY) window.addEventListener(type, reset, { capture: true, passive: true });
  window.addEventListener("location-changed", onLocation);
  window.addEventListener("popstate", onLocation);
  active = { stop };
  label();
  document.body.appendChild(pill);
  navigate(dashboard);
}
