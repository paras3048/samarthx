import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function SiteFooter() {
  return <footer className="site-footer overflow-hidden border-t px-5 pt-12">
    <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-start">
      <div className="max-w-xs"><Link to="/" aria-label="SamarthX home"><Logo className="w-28" /></Link><p className="mt-4 text-sm leading-relaxed text-muted-foreground">A shared foundation for education.<br />From state decisions to student futures.</p></div>
      <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-4 text-sm"><Link to="/platform" className="hover:text-primary">Platform</Link><Link to="/solutions" className="hover:text-primary">Solutions</Link><Link to="/about" className="hover:text-primary">About Us</Link><Link to="/" hash="contact" className="inline-flex items-center gap-1 hover:text-primary">Contact<ArrowUpRight className="h-3 w-3" /></Link></nav>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SamarthX</p>
    </div>
    <div className="footer-wordmark -mx-5 mt-14" aria-hidden><Logo className="w-full" wordmarkOnly /></div>
  </footer>;
}