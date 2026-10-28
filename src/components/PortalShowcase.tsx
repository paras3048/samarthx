import desktopPortal from "@/assets/samarthx-desktop-portal.png.asset.json";
import mobilePortal from "@/assets/samarthx-mobile-portal.png.asset.json";
import { SectionTitle } from "./MarketingSections";
import { Reveal } from "./Reveal";

export function PortalShowcase() {
  return <section className="border-y bg-card/50 px-5 py-20">
    <SectionTitle eyebrow="Inside SamarthX" title="One entry point. The right portal for you." body="Choose your profile on desktop, or select your portal and request an OTP on mobile." />
    <div className="mx-auto mt-12 grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_260px]">
      <Reveal variant="left" className="min-w-0">
        <div className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-product)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1">
          <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-3" aria-hidden="true"><span className="h-2 w-2 rounded-full bg-border" /><span className="h-2 w-2 rounded-full bg-border" /><span className="h-2 w-2 rounded-full bg-border" /><span className="ml-3 text-xs text-muted-foreground">SamarthX · School portal</span></div>
          <img src={desktopPortal.url} alt="SamarthX desktop sign-in mockup with School, Employee and Student profile choices." width={1600} height={755} loading="lazy" className="block h-auto w-full" />
        </div>
        <div className="mt-5"><h3 className="text-lg font-semibold">Start with your profile</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">School, employee and student access from a single sign-in screen.</p></div>
      </Reveal>
      <Reveal variant="right" delay={0.2} className="mx-auto w-full max-w-[260px]">
        <div className="overflow-hidden rounded-lg border bg-card shadow-[var(--shadow-product)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"><img src={mobilePortal.url} alt="SamarthX mobile DHE portal sign-in mockup with Send OTP and Student, Employee, School, Department Employee and DHE portal choices." width={768} height={1547} loading="lazy" className="block h-auto w-full" /></div>
        <div className="mt-5"><h3 className="text-lg font-semibold">Your portal, on mobile</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Select a portal and continue with email or phone-based OTP sign-in.</p></div>
      </Reveal>
    </div>
    <p className="mx-auto mt-8 max-w-6xl text-xs text-muted-foreground">SamarthX portal mockups</p>
  </section>;
}