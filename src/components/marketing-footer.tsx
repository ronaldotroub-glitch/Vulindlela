import { Brand } from "./brand";
import { Github, Twitter, Linkedin } from "lucide-react";

export function MarketingFooter() {
  const cols = [
    { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
    { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="border-t border-border bg-card/30 mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <Brand />
            <p className="text-sm text-muted-foreground mt-4 max-w-sm">
              The AI workplace assistant that automates emails, meetings, planning, and research — so your team can focus on real work.
            </p>
            <form className="mt-5 flex gap-2 max-w-sm">
              <input type="email" placeholder="you@company.com" className="flex-1 rounded-lg bg-input border border-border px-3 py-2 text-sm" />
              <button className="text-sm font-semibold px-4 py-2 rounded-lg text-white" style={{ background: "var(--gradient-primary)" }}>Subscribe</button>
            </form>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="text-sm font-semibold text-foreground">{c.title}</h4>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} ActivePilot AI. All rights reserved.</p>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="size-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="size-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="size-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}