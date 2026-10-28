import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landmark, MapPin, Radio } from "lucide-react";
import { INDIA_STATES, project } from "./india-map-paths";

export type OnboardedState = {
  name: string;
  /** Name as it appears in the map data */
  mapName: string;
  lng: number;
  lat: number;
  subtitle: string;
  stats: [string, string][];
  summary: string;
};

// Add new states here as they are onboarded — a pin appears automatically.
export const ONBOARDED_STATES: OnboardedState[] = [
  {
    name: "Goa",
    mapName: "Goa",
    lng: 74.05,
    lat: 15.35,
    subtitle: "School education deployment",
    stats: [
      ["1,467", "Active schools"],
      ["100%", "Live implementation"],
      ["100%", "Real-time sync"],
    ],
    summary:
      "SamarthX runs across Goa's school education system, connecting institutional records with state-level oversight — designed and developed with the University of Delhi's IIC, South Campus.",
  },
];

// Deterministic, varied blue tints so the map reads colourful instead of all-white.
const TINTS = [7, 11, 15, 9, 18, 13, 6, 20];
function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return TINTS[h % TINTS.length]!;
}

export function StatesMap() {
  const [active, setActive] = useState<OnboardedState>(ONBOARDED_STATES[0]!);
  const onboarded = new Set(ONBOARDED_STATES.map((s) => s.mapName));
  const isOnboarded = (name: string) => onboarded.has(name);

  return (
    <div className="relative mx-auto mt-10 grid max-w-5xl items-center gap-8 md:grid-cols-[1.05fr_1fr]">
      <div className="relative mx-auto w-full max-w-md">
        <svg viewBox="-50 -45 700 714" className="h-auto w-full drop-shadow-[0_20px_40px_hsl(var(--primary)/0.12)]" role="img" aria-label="Map of India showing onboarded states">
          {INDIA_STATES.map((s) => {
            const live = isOnboarded(s.name);
            return (
              <path
                key={s.name}
                d={s.d}
                fill={
                  live
                    ? "var(--amber)"
                    : `color-mix(in oklab, var(--blue) ${tintFor(s.name)}%, white)`
                }
                stroke={
                  live
                    ? "color-mix(in oklab, var(--amber) 55%, var(--navy))"
                    : "color-mix(in oklab, var(--blue) 45%, white)"
                }
                strokeWidth={live ? 1.4 : 0.7}
                strokeLinejoin="round"
                style={live ? { filter: "drop-shadow(0 0 6px color-mix(in oklab, var(--amber) 75%, transparent))" } : undefined}
              >
                {live && (
                  <animate attributeName="opacity" values="1;0.72;1" dur="2.6s" repeatCount="indefinite" />
                )}
              </path>
            );
          })}
          {ONBOARDED_STATES.map((s, i) => {
            const { x, y } = project(s.lng, s.lat);
            const isActive = active.name === s.name;
            return (
              <g
                key={s.name}
                transform={`translate(${x} ${y})`}
                className="cursor-pointer"
                onMouseEnter={() => setActive(s)}
                onFocus={() => setActive(s)}
                tabIndex={0}
                role="button"
                aria-label={`Show ${s.name}`}
              >
                <circle r={24} className="fill-transparent" />
                <circle r={13} fill="none" stroke="color-mix(in oklab, var(--amber) 80%, transparent)" strokeWidth={2} />
                <circle r={7} fill="color-mix(in oklab, var(--amber) 70%, var(--navy))" />
                <circle r={6} fill="color-mix(in oklab, var(--amber) 40%, transparent)">
                  <animate attributeName="r" values="6;24" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                </circle>
                <motion.g style={{ scale: isActive ? 1.5 : 1.25 }}
                  initial={{ y: -40 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1 }, opacity: { duration: 0.8 } }}
                >
                  <path
                    d="M0 0 C -4 -8 -12 -14 -12 -24 A 12 12 0 1 1 12 -24 C 12 -14 4 -8 0 0 Z"
                    fill="var(--primary)" stroke="white"
                    strokeWidth={2}
                  />
                  <circle cy={-24} r={4.5} fill="white" />
                </motion.g>
              </g>
            );
          })}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.name}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card-surface overflow-hidden rounded-2xl border bg-card/80 text-left backdrop-blur"
        >
          <div className="flex items-center justify-between gap-4 border-b px-6 py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Landmark className="h-5 w-5" /></span>
              <div>
                <h2 className="text-2xl font-semibold">{active.name}</h2>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{active.subtitle}</p>
              </div>
            </div>
            <p className="flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary"><Radio className="h-3.5 w-3.5 animate-pulse" />Live</p>
          </div>
          <div className="grid grid-cols-3 gap-3 px-6 py-5">
            {active.stats.map(([v, l]) => (
              <div key={l} className="stat-card rounded-xl border p-3 text-center">
                <p className="text-2xl font-semibold text-gradient">{v}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <p className="border-t px-6 py-4 text-sm leading-relaxed text-muted-foreground">{active.summary}</p>
          <p className="flex items-center gap-2 border-t px-6 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-primary" />{ONBOARDED_STATES.length} state{ONBOARDED_STATES.length > 1 ? "s" : ""} onboarded</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
