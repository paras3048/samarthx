import { createFileRoute } from "@tanstack/react-router";
import { Landmark, School, Signal, type LucideIcon } from "lucide-react";
import { StatesMap } from "@/components/StatesMap";
import { ContactCTA } from "@/components/MarketingSections";
import { Reveal, RevealText } from "@/components/Reveal";

export const Route = createFileRoute("/states-onboarded")({
  head: () => ({ meta: [{ title: "States Onboarded — SamarthX in Action" }, { name: "description", content: "See where SamarthX is live today, starting with Goa's school education deployment." }, { property: "og:title", content: "States Onboarded — SamarthX in Action" }, { property: "og:description", content: "SamarthX is live in Goa, connecting 1,467 schools to state-level education governance." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StatesOnboarded,
});

const STEPS: [string, string, LucideIcon][] = [
  ["Connect", "Records from institutions are brought onto one shared platform.", Landmark],
  ["Adopt", "State, institution, parent and student teams get their own views.", School],
  ["Go live", "The state governs on current, connected information.", Signal],
];

function StatesOnboarded() {
  return <main>
    <section className="product-opening relative px-5 pb-16 pt-32 sm:pt-36"><div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" /><div className="relative mx-auto max-w-3xl text-center"><Reveal variant="blur"><p className="eyebrow">Where SamarthX is live</p></Reveal><h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl"><RevealText text="States onboarded" className="text-gradient" /></h1></div>
      <Reveal variant="up" delay={0.3}><StatesMap /></Reveal>
      <p className="relative mx-auto mt-10 max-w-5xl text-center text-xs text-muted-foreground">Figures are based on information published on the SamarthX careers website. Hover a pin to see that state's details.</p>
    </section>

    <section className="border-y bg-card/60 px-5 py-20"><div className="mx-auto max-w-3xl text-center"><Reveal variant="blur"><p className="eyebrow">Bringing a state online</p></Reveal><h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl"><RevealText text="Three steps from records" /><br /><RevealText text="to real-time governance." delay={0.2} /></h2></div><div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
      {STEPS.map(([title, body, Icon], i) => <Reveal key={title} variant="up" delay={i * 0.12}><div className="feature-tile h-full rounded-2xl border bg-card/80 p-8"><p className="font-mono text-xs uppercase tracking-widest text-blue">Step {i + 1}</p><Icon className="mt-4 h-8 w-8 text-primary" /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p></div></Reveal>)}
    </div></section>

    <ContactCTA />
  </main>;
}
