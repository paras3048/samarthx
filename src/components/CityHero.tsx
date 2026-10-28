import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Landmark, School, Building2, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText } from "@/components/Reveal";

import city from "@/assets/hero-city.jpg";

const PINS = [
  { label: "Directorate", x: 12, y: 36, Icon: Landmark },
  { label: "School", x: 19, y: 64, Icon: School },
  { label: "School", x: 36, y: 70, Icon: School },
  { label: "District office", x: 70, y: 40, Icon: Building2 },
  { label: "School", x: 76, y: 70, Icon: School },
  { label: "Homes", x: 90, y: 60, Icon: MessageSquareText },
];
const HUB = { x: 52, y: 62 };
const TOASTS = [
  ["New message from school", "iCommunicate · PTM on Saturday"],
  ["Attendance synced", "1,467 schools · updated just now"],
  ["Scholarship approved", "Student services · Directorate"],
];

export function CityHero() {
  const [view, setView] = useState<"city" | "gov">("city");
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT((v) => (v + 1) % TOASTS.length), 4000); return () => clearInterval(id); }, []);

  return (
    <section className="relative min-h-[max(100svh,860px)] overflow-hidden px-5 pt-32 sm:pt-36">
      <img src={city} alt="Illustrated city with a directorate, schools, district office and homes" width={1920} height={1024} className="pointer-events-none absolute inset-x-0 bottom-0 top-[380px] h-auto w-full object-cover [mask-image:linear-gradient(to_bottom,transparent,black_30%)] object-bottom opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/70 to-transparent" style={{ height: "0" }} aria-hidden="true" />

      {/* pins layer, aligned to image area */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[380px] hidden md:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <AnimatePresence>
            {view === "gov" && PINS.map((p, i) => (
              <motion.line key={i} x1={p.x} y1={p.y} x2={HUB.x} y2={HUB.y} stroke="var(--blue)" strokeWidth="0.25" strokeDasharray="1 1" vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.8 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, delay: i * 0.08 }} style={{ strokeWidth: 1.5 }} />
            ))}
          </AnimatePresence>
        </svg>
        {PINS.map((p, i) => (
          <motion.div key={i} className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: `${p.x}%`, top: `${p.y}%` }}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: [0, -4, 0] }} transition={{ opacity: { delay: 0.8 + i * 0.12, duration: 0.7 }, y: { delay: 1.5 + i * 0.3, duration: 3.5, repeat: Infinity, ease: "easeInOut" } }}>
            <span className="mb-2 text-xs font-medium text-muted-foreground">{p.label}</span>
            <span className={`grid h-9 w-9 place-items-center rounded-lg border shadow-md backdrop-blur ${view === "gov" ? "bg-primary text-primary-foreground" : "bg-card/90 text-primary"}`}><p.Icon className="h-4 w-4" /></span>
            <span className="h-5 w-px bg-primary/50" />
          </motion.div>
        ))}
        <motion.div className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center" style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.9 }}>
          <span className="grid h-14 w-14 place-items-center rounded-xl border-2 border-primary/40 bg-primary shadow-xl"><img src="/favicon.svg" alt="" className="h-8 w-8" /></span>
          <span className="h-6 w-px bg-primary/60" />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal variant="blur"><p className="eyebrow">India's connected school governance ecosystem</p></Reveal>
        <h1 className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-5xl xl:text-6xl">
          <RevealText text="Bringing Every School Together" /><br className="hidden sm:block" />
          <RevealText text="on One Platform" className="text-gradient" delay={0.3} />
        </h1>
        <Reveal delay={0.45}><p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">SamarthX brings governance, administration, people and student journeys into one secure digital platform, helping education teams move faster and make better decisions.</p></Reveal>
        <Reveal delay={0.6}><div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="h-12 rounded-full px-7 shadow-lg"><Link to="/" hash="contact">Join SamarthX<ChevronRight /></Link></Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full bg-card/80 px-7 backdrop-blur"><Link to="/" hash="platform">Explore Interactive Demo<ChevronRight /></Link></Button>
        </div></Reveal>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1 rounded-full border bg-card/90 p-1 shadow-md backdrop-blur">
        {(["city", "gov"] as const).map((v) => (
          <button key={v} type="button" onClick={() => setView(v)} className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${view === v ? "text-primary-foreground" : "text-foreground"}`}>
            {view === v && <motion.span layoutId="hero-view" className="absolute inset-0 rounded-full bg-primary" transition={{ duration: 0.5 }} />}
            <span className="relative">{v === "city" ? "City" : "Governance view"}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-20 right-6 z-10 hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div key={t} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.6 }}
            className="flex items-center gap-3 rounded-xl border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary"><MessageSquareText className="h-4 w-4" /></span>
            <div><p className="text-sm font-semibold">{TOASTS[t]?.[0]}</p><p className="text-xs text-muted-foreground">{TOASTS[t]?.[1]}</p></div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
