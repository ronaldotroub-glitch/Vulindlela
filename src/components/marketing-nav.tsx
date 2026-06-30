import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#features", label: "Features" },
  { href: "#benefits", label: "Benefits" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Brand />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link to="/auth/login" className="text-sm font-medium px-3 py-2 text-muted-foreground hover:text-foreground transition">Log in</Link>
          <Link to="/auth/register" className="text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition" style={{ background: "var(--gradient-primary)" }}>
            Get started
          </Link>
        </div>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-muted-foreground">{l.label}</a>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <ThemeToggle />
              <Link to="/auth/login" className="flex-1 text-center text-sm py-2 border border-border rounded-lg">Log in</Link>
              <Link to="/auth/register" className="flex-1 text-center text-sm py-2 rounded-lg text-white" style={{ background: "var(--gradient-primary)" }}>Get started</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}