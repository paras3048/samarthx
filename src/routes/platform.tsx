import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Database, Workflow, ShieldCheck } from "lucide-react";
import { DashboardPreview } from "@/components/DashboardPreview";
import { ContactCTA, FeatureGrid, SectionTitle } from "@/components/MarketingSections";
import { Button } from "@/components/ui/button";
import { PortalShowcase } from "@/components/PortalShowcase";
import { Reveal, RevealText } from "@/components/Reveal";

export const Route = createFileRoute("/platform")({
  head: () => ({ meta: [{ title: "SamarthX Platform — Connected Education Management" }, { name: "description", content: "Explore SamarthX modules for student records, employees, academics, welfare and education governance." }, { property: "og:title", content: "SamarthX Platform — Connected Education Management" }, { property: "og:description", content: "One connected foundation for institutional operations and state education governance." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: Platform,
});

function Platform() {
  return <main><section className="product-opening relative px-5 pb-16 pt-40 sm:pt-44"><div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" /><div className="relative mx-auto max-w-3xl text-center"><Reveal variant="blur"><p className="eyebrow">The SamarthX platform</p></Reveal><h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl"><RevealText text="Education management." /><br /><RevealText text="Connected by design." className="text-gradient" delay={0.3} /></h1><Reveal delay={0.45}><p className="mx-auto mt-5 max-w-xl text-muted-foreground">From daily school workflows to state-wide oversight, one reliable foundation for every record and every role.</p><Button asChild variant="cta" size="lg" className="mt-7"><Link to="/" hash="contact">Explore with our team<ArrowUpRight /></Link></Button></Reveal></div><Reveal variant="scale" delay={0.35} className="relative mx-auto mt-14 max-w-6xl"><DashboardPreview initialView="Institution" /></Reveal></section>
    <PortalShowcase />
    <section className="px-5 py-20"><SectionTitle eyebrow="Your modules, working together" title="Less fragmentation. More possibility." body="A coherent set of tools for the people, processes and records that keep education moving." /><FeatureGrid /></section>
    <section className="border-y bg-card/60 px-5 py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">{[[Database,"A shared data foundation","Keep institutional records connected instead of duplicating them across departments."], [Workflow,"Coordinated workflows","Give each role the right view of approvals, records and everyday operations."], [ShieldCheck,"Clear accountability","Maintain traceable records to support review, compliance and informed decisions."]].map(([Icon,title,body],i) => { const I = Icon as typeof Database; return <Reveal key={String(title)} variant="up" delay={i * 0.12}><I className="h-7 w-7 text-primary" /><h3 className="mt-5 text-xl font-semibold">{String(title)}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{String(body)}</p></Reveal>; })}</div></section><ContactCTA /></main>;
}