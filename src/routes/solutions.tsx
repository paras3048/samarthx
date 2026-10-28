import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Landmark, School, Users, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardPreview } from "@/components/DashboardPreview";
import { ConnectedSection, ContactCTA } from "@/components/MarketingSections";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText } from "@/components/Reveal";

export const Route = createFileRoute("/solutions")({
  head: () => ({ meta: [{ title: "SamarthX Solutions — State, Institution, Parent & Student" }, { name: "description", content: "Explore connected education services for states, institutions, parents and students with SamarthX." }, { property: "og:title", content: "SamarthX Solutions — For Every Education Stakeholder" }, { property: "og:description", content: "Purpose-built views for state governance, institutional management, parent services and student academics." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Solutions,
});
const ROLES = {
  State: { icon: Landmark, title: "The whole picture. Not another spreadsheet.", body: "Bring institutional records into a central view, so education leaders can coordinate, monitor and govern with clarity.", features: ["Centralised institutional data", "District-level reporting and analytics", "Policy and compliance monitoring", "Welfare and scheme oversight"] },
  Institution: { icon: School, title: "More time for education. Less administration.", body: "Manage the records and workflows behind a well-run institution, all connected to the wider education system.", features: ["Employee and teacher records", "Student admissions and academic records", "Attendance, assessments and timetables", "Mid-day meal records and reporting"] },
  Parent: { icon: Users, title: "Stay close to every learning milestone.", body: "Relevant school updates and your child’s progress, without repeated visits or complicated processes.", features: ["Academic progress and report cards", "Attendance updates", "School notices and fee information", "Connected communication with the institution"] },
  Student: { icon: GraduationCap, title: "Your education. Within easy reach.", body: "A clear place for academic records, learning updates and opportunities throughout your student journey.", features: ["Academic records and results", "Timetables and school updates", "Scholarship information", "Learning resources and certificates"] },
};
const ROLE_LABEL = { State: "state governments", Institution: "institutions", Parent: "parents", Student: "students" } as const;
const EASE = [0.22, 1, 0.36, 1] as const;

function Solutions() {
  const [role, setRole] = useState<keyof typeof ROLES>("State");
  const data = ROLES[role];
  return <main>
    <section className="product-opening relative px-5 pb-14 pt-40 sm:pt-44"><div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" /><div className="relative mx-auto max-w-3xl text-center"><Reveal variant="blur"><p className="eyebrow">Solutions for every stakeholder</p></Reveal><h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl"><RevealText text="Your role. Your view." /><br /><RevealText text="One SamarthX." className="text-gradient" delay={0.3} /></h1><Reveal delay={0.45}><p className="mx-auto mt-5 max-w-xl text-muted-foreground">State, institution, parent or student — stay connected to what matters, without the complexity.</p></Reveal></div></section>
    <section className="px-5 pb-20"><div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap justify-center gap-3 border-b pb-6" role="tablist" aria-label="Stakeholder solutions">
        {(Object.keys(ROLES) as (keyof typeof ROLES)[]).map(key => { const Icon = ROLES[key].icon; return <Button key={key} variant={role === key ? "default" : "outline"} role="tab" aria-selected={role === key} onClick={() => setRole(key)} className="h-12 px-5"><Icon />{key}</Button>; })}
      </div>
      <div className="grid gap-10 py-12 md:grid-cols-2">
        <motion.div key={`copy-${role}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <p className="eyebrow">For {ROLE_LABEL[role]}</p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight">{data.title}</h2>
          <p className="mt-5 max-w-lg leading-relaxed text-muted-foreground">{data.body}</p>
        </motion.div>
        <div className="self-center">
          {data.features.map((item, i) => <motion.div key={`${role}-${item}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: EASE }} className="flex items-center gap-3 border-b py-4 text-sm"><Check className="h-4 w-4 shrink-0 text-success" />{item}</motion.div>)}
          <Button asChild variant="link" className="mt-4 px-0"><Link to="/" hash="contact">Talk to our team<ArrowUpRight /></Link></Button>
        </div>
      </div>
      <Reveal key={role} variant="scale"><DashboardPreview key={role} initialView={role} /></Reveal>
    </div></section>
    <ConnectedSection />
    <ContactCTA />
  </main>;
}
