import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Network, Activity, HeartHandshake } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";
import { ConnectedSection, ContactCTA, FeatureGrid, SectionTitle } from "@/components/MarketingSections";
import { DemoForm } from "@/components/DemoForm";
import { Button } from "@/components/ui/button";
import { PortalShowcase } from "@/components/PortalShowcase";
import { Reveal } from "@/components/Reveal";
import { CityHero } from "@/components/CityHero";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "SamarthX — Connected E-Governance for Education" }, { name: "description", content: "One connected platform for state education governance, institutional records, parents and students." }, { property: "og:title", content: "SamarthX — Connected E-Governance for Education" }, { property: "og:description", content: "Bring states, institutions, parents and students together on one shared education platform." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Index,
});
function Index() {
  return <main id="top">
    <CityHero />
    <section className="px-5 py-20"><Reveal variant="scale" className="relative mx-auto max-w-6xl"><DashboardPreview /></Reveal></section>
    <section id="platform" className="px-5 py-20"><SectionTitle eyebrow="The platform" title="Education management, brought together." body="The records, workflows and insights you need — working as one, not in separate systems." /><FeatureGrid /><div className="mt-10 text-center"><Button asChild variant="outline" className="h-11"><Link to="/platform">Explore the platform<ArrowUpRight /></Link></Button></div></section>
    <ConnectedSection />
    <PortalShowcase />
    <section id="how-it-works" className="border-y bg-card/60 px-5 py-20"><SectionTitle eyebrow="How it works" title="From scattered records to shared understanding." /><div className="mx-auto mt-14 grid max-w-6xl gap-10 md:grid-cols-3">{[[Network,"Connect your institutions","Bring every school and office into one shared registry of verified records."], [Activity,"Turn records into insight","See attendance, staffing and welfare reporting in a connected governance view."], [HeartHandshake,"Keep people connected","Give parents and students relevant access to progress, notices and academic records."]].map(([Icon,title,body],i) => { const I = Icon as typeof Network; return <Reveal key={String(title)} variant="up" delay={i * 0.12}><div className="flex items-center justify-between"><I className="h-7 w-7 text-primary" /><span className="font-mono text-xs text-muted-foreground">0{i+1}</span></div><h3 className="mt-6 text-xl font-semibold">{String(title)}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{String(body)}</p></Reveal>; })}</div></section>
    <section id="impact" className="px-5 py-24"><SectionTitle eyebrow="The bigger picture" title="Better operations. More informed governance." /><div className="mx-auto mt-12 grid max-w-6xl gap-8 border-y py-10 sm:grid-cols-3">{[["One source","Connected institutional records"], ["Every role","Relevant, accessible information"], ["Shared insight","A clearer basis for decisions"]].map(([title,body],i) => <Reveal key={title} variant="up" delay={i * 0.12} className="text-center"><p className="text-3xl font-semibold text-gradient">{title}</p><p className="mt-3 text-sm text-muted-foreground">{body}</p></Reveal>)}</div></section>
    <section id="contact" className="border-t bg-card/50 px-5 py-24"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.3fr]"><Reveal variant="left"><p className="eyebrow">Let’s connect</p><h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">See SamarthX<br />in action.</h2><p className="mt-5 max-w-sm leading-relaxed text-muted-foreground">Tell us about your department or institution. We’ll arrange a guided walkthrough around your needs.</p></Reveal><Reveal variant="right" delay={0.15}><DemoForm /></Reveal></div></section>
    <ContactCTA />
  </main>;
}
