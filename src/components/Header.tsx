import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { PLATFORM_GROUPS, SOLUTIONS } from "./header-content";
import { cn } from "@/lib/utils";

export const NAV = [
  { id: "platform", label: "Platform" },
  { id: "stakeholders", label: "Solutions" },
  { id: "platform", label: "How It Works" },
  { id: "impact", label: "Impact" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

const ease = [0.22, 1, 0.36, 1] as const;
type Menu = "Platform" | "Solutions";

function FutureItem({ title, description }: { title: string; description: string }) {
  if (title === "Platform Overview") return <Link to="/platform" className="block rounded-md px-2 py-2.5 hover:bg-accent"><p className="text-sm font-semibold text-primary">{title}<ArrowUpRight className="ml-1 inline h-3 w-3" /></p><p className="mt-1 text-xs text-muted-foreground">{description}</p></Link>;
  return <div className="flex gap-2.5 rounded-md px-2 py-2.5">
    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue/60" />
    <div className="min-w-0"><p className="text-sm font-semibold text-ink">{title}</p>
      {description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>}
    </div>
  </div>;
}

export function Header() {
  const [compact, setCompact] = useState(false);
  const [menu, setMenu] = useState<Menu | null>(null);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    const onPointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(null); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const go = (id: string) => { setMenu(null); scrollToId(id); };
  const sectionLink = (id: string, label: string) => <Button asChild variant="ghost" className="shrink-0 px-2 text-xs xl:text-sm"><Link to="/" hash={id} onClick={() => setMenu(null)}>{label}</Link></Button>;
  const trigger = (name: Menu) => <Button variant="ghost" onClick={() => setMenu(menu === name ? null : name)}
    aria-expanded={menu === name} aria-controls="header-menu" className={cn("px-2 text-xs xl:text-sm", menu === name && "bg-accent text-navy")}>
    {name}<ChevronDown className={cn("transition-transform duration-700", menu === name && "rotate-180")} />
  </Button>;

  return <header ref={root} className="pointer-events-none fixed inset-x-0 top-4 z-50 px-3 md:top-5 md:px-6">
    <motion.div layout transition={{ layout: { duration: 0.8, ease } }}
      className={cn("glass pointer-events-auto mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-2xl px-3 py-2 md:px-4", compact ? "max-w-7xl" : "max-w-[1440px]")}>
      <nav aria-label="Primary" className="hidden items-center justify-self-start md:flex">
        {trigger("Platform")}{trigger("Solutions")}
        {sectionLink("how-it-works", "How It Works")}
      </nav>
      <span className="md:hidden" />
      <Link to="/" aria-label="SamarthX home" onClick={() => { setMenu(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="justify-self-center">
        <Logo className={cn("transition-[width] duration-700", compact ? "w-24" : "w-28 xl:w-32")} />
      </Link>
      <div className="flex items-center justify-end gap-1">
        <nav aria-label="Secondary" className="hidden items-center md:flex">
          {sectionLink("impact", "Impact")}
          <Button asChild variant="ghost" className="px-2 text-xs xl:text-sm"><Link to="/states-onboarded" onClick={() => setMenu(null)}>States Onboarded</Link></Button>
          <Button asChild variant="ghost" className="px-2 text-xs xl:text-sm"><Link to="/about" onClick={() => setMenu(null)}>About Us</Link></Button>
        </nav>
        <Button asChild variant="outline" className="px-3 text-xs xl:text-sm"><Link to="/" hash="contact" onClick={() => setMenu(null)}>Contact</Link></Button>
      </div>
      <nav aria-label="Main navigation" className="col-span-3 flex min-w-0 items-center justify-start gap-1 overflow-x-auto border-t pt-2 sm:justify-center md:hidden">
        {trigger("Platform")}{trigger("Solutions")}
        {sectionLink("how-it-works", "How It Works")}{sectionLink("impact", "Impact")}
        <Button asChild variant="ghost" className="shrink-0 px-2 text-xs"><Link to="/states-onboarded" onClick={() => setMenu(null)}>States Onboarded</Link></Button>
        <Button asChild variant="ghost" className="shrink-0 px-2 text-xs"><Link to="/about" onClick={() => setMenu(null)}>About Us</Link></Button>
      </nav>
    </motion.div>
    <AnimatePresence>
      {menu && <motion.div id="header-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.7, ease }}
        className="pointer-events-auto mx-auto mt-3 max-h-[calc(100svh-110px)] max-w-[1440px] overflow-y-auto overscroll-contain rounded-lg border bg-popover p-4 shadow-[var(--shadow-card)] sm:p-6">
        <div className="mb-4 flex items-center justify-between border-b pb-3">
          <div className="flex flex-wrap items-center gap-4"><h2 className="text-base font-bold text-navy">{menu}</h2>{menu === "Platform" && <Link to="/platform" onClick={() => setMenu(null)} className="inline-flex items-center gap-1 text-xs text-primary">Explore platform<ArrowUpRight className="h-3 w-3" /></Link>}{menu === "Solutions" && <Link to="/solutions" onClick={() => setMenu(null)} className="inline-flex items-center gap-1 text-xs text-primary">Explore all solutions<ArrowUpRight className="h-3 w-3" /></Link>}</div>
          <Button variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setMenu(null)}><X /></Button>
        </div>
        {menu === "Platform" && <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PLATFORM_GROUPS.map(group => <section key={group.title}>
              <h3 className="mb-2 font-mono text-xs uppercase text-blue">{group.title}</h3>
              {group.items.map(([title, description]) => <FutureItem key={title} title={title} description={description} />)}
            </section>)}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <div><p className="text-sm font-bold">See SamarthX in action</p><p className="mt-1 text-xs text-muted-foreground">A 30-minute walkthrough, tailored to your schools.</p></div>
            <Button asChild><Link to="/" hash="contact" onClick={() => setMenu(null)}>Book a walkthrough<ArrowUpRight /></Link></Button>
          </div>
        </>}
        {menu === "Solutions" && <div className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{SOLUTIONS.map(([title, description]) => <FutureItem key={title} title={title} description={description} />)}</div>}
      </motion.div>}
    </AnimatePresence>
  </header>;
}
