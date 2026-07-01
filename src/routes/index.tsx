import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mail, FileText, ListTodo, ArrowRight, Check,
  Sparkles, Bot, Zap, Clock, Shield, Star, ChevronDown, BrainCircuit,
  Wifi, WifiOff, Languages, MessageSquare,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vulindlela — Open the path. AI productivity built for South Africa" },
      { name: "description", content: "An AI workspace for SA SMEs and contractors. Draft corporate emails, summarize Imbizo voice notes, and plan grid-aware days that survive loadshedding." },
      { property: "og:title", content: "Vulindlela — Open the path" },
      { property: "og:description", content: "AI productivity for South African SMEs — beat loadshedding, the language tax, and admin overload." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mail, title: "Smart Email Contextualizer", desc: "Draft in rough English or local slang — Vulindlela shifts it into Corporate Pitch, Client Care, or Debt Collection tone.", color: "from-emerald-500 to-teal-600" },
  { icon: FileText, title: "Imbizo Voice & Meeting Summarizer", desc: "Turn long WhatsApp voice notes and virtual Imbizos into a 3-sentence TL;DR, action items, and hard deadlines.", color: "from-amber-500 to-orange-600" },
  { icon: ListTodo, title: "Grid-Aware Task Planner", desc: "Tag tasks by resource (Wi-Fi, power, offline mobile). When the grid drops, Vulindlela reshuffles the day instantly.", color: "from-teal-500 to-cyan-600" },
  { icon: Languages, title: "Corporate Language Assist", desc: "Second- or third-language English speakers ship confident proposals without the anxiety tax.", color: "from-rose-500 to-orange-500" },
  { icon: WifiOff, title: "Low-Bandwidth by Design", desc: "Text-only summaries return instantly, even on a poor 3G connection during load-shedding recovery.", color: "from-indigo-500 to-emerald-600" },
  { icon: MessageSquare, title: "AI Chat Copilot", desc: "One conversational surface for follow-up questions, rewrites, and next-step suggestions.", color: "from-amber-500 to-rose-600" },
];

const stats = [
  { value: 12, suffix: "", label: "Official SA languages we translate intent from" },
  { value: 80, suffix: "%", label: "Less time on admin during uptime" },
  { value: 3, suffix: "×", label: "Faster corporate email drafting" },
  { value: 3, suffix: "G", label: "Works on low-bandwidth connections" },
];

const faqs = [
  { q: "What does Vulindlela mean?", a: "Vulindlela means \"Open the path\" or \"Clear the way\" in the Nguni languages. That is exactly what the product does — it clears the administrative bottleneck that stifles South African SMEs and independent contractors." },
  { q: "Who is this built for?", a: "South African SMEs, freelancers, and contractors who lose their most valuable uptime hours to admin — pitching to retailers, chasing late payments, and summarizing long voice-note briefs." },
  { q: "How does it handle loadshedding?", a: "The Grid-Aware Planner tags every task by resource need. When you flip to offline, we instantly reshuffle offline-safe work (reading summaries, drafting emails) to the front so a disrupted day is still a productive day." },
  { q: "Can I write in my own English?", a: "Yes. Draft in rough, conversational English — mix in local phrases if you want. The Contextualizer translates intent into Corporate Pitch, Client Care, or firm Debt Collection tone." },
  { q: "Will it work on a poor 3G signal?", a: "Yes. Vulindlela processes in the cloud and returns tiny text-only summaries — a 15-minute voice note becomes a three-sentence TL;DR that loads instantly." },
];

const plans = [
  { name: "Hustler", price: "R0", desc: "For solo contractors testing the path", features: ["10 AI requests/day", "Email + voice-note summariser", "Grid-aware planner"], cta: "Start free", featured: false },
  { name: "SME", price: "R199", desc: "For growing South African teams", features: ["Unlimited AI requests", "All modules", "History & analytics", "Debt-collection tone pack", "Priority support"], cta: "Start SME trial", featured: true },
  { name: "Enterprise", price: "Custom", desc: "For corporates and franchises", features: ["SSO + role management", "POPIA-aligned data handling", "Custom integrations", "Dedicated success manager", "SLA"], cta: "Contact sales", featured: false },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="rounded-2xl border border-border bg-card overflow-hidden">
          <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
            <span className="font-medium">{f.q}</span>
            <ChevronDown className={`size-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <motion.div initial={false} animate={{ height: open === i ? "auto" : 0 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <MarketingNav />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 -left-20 size-72 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-primary)" }}
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-10 right-0 size-80 rounded-full blur-3xl opacity-30"
            style={{ background: "var(--gradient-accent)" }}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5 text-primary" /> Built for South Africa · Grid-aware · POPIA-ready
            </div>
            <h1 className="mt-5 text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>Vulindlela.</span>{" "}
              Open the path through admin, loadshedding, and the language tax.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              An AI productivity workspace for South African SMEs and contractors. Draft corporate emails, summarize Imbizo voice notes, and plan a day that survives the grid.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                Clear the way <ArrowRight className="size-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-border bg-card/60 backdrop-blur hover:bg-card transition">
                Try the demo
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> Works on 3G</div>
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> Loadshedding-ready</div>
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> No credit card</div>
            </div>
          </motion.div>

          {/* Animated illustration */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl border border-border bg-card/70 backdrop-blur-xl p-6 shadow-2xl" style={{ boxShadow: "var(--shadow-glow)" }}>
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <div className="size-2.5 rounded-full bg-danger/80" />
                <div className="size-2.5 rounded-full bg-warning/80" />
                <div className="size-2.5 rounded-full bg-success/80" />
                <div className="ml-3 text-xs text-muted-foreground">vulindlela.ai/chat</div>
              </div>
              <div className="pt-5 space-y-4">
                <div className="flex justify-end">
                  <div className="rounded-2xl px-4 py-2.5 text-sm text-white max-w-[80%]" style={{ background: "var(--gradient-primary)" }}>
                    Turn this 14-min voice note into an action list, then draft a firm follow-up to the retailer that hasn't paid.
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-3">
                  <div className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 text-sm bg-muted text-foreground/90 max-w-[85%] space-y-2">
                    <p><strong>Imbizo TL;DR</strong></p>
                    <p>Site visit confirmed Fri 09h00. Deposit of R42,000 due before delivery. Sipho owns the compliance pack.</p>
                    <p className="text-xs text-muted-foreground">✶ Debt-collection email drafted · Corporate tone · 12KB</p>
                  </div>
                </motion.div>
              </div>
            </div>
            {/* Floating icons */}
            {[Mail, ListTodo, FileText, BrainCircuit].map((Icon, i) => (
              <motion.div
                key={i}
                className="absolute size-12 rounded-2xl border border-border bg-card flex items-center justify-center shadow-xl"
                style={{
                  top: ["10%", "70%", "20%", "80%"][i],
                  left: ["-8%", "-6%", "100%", "95%"][i],
                }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
              >
                <Icon className="size-5 text-primary" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">The Vulindlela Workspace</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Three core paths cleared</h2>
          <p className="mt-3 text-muted-foreground">Corporate email confidence, Imbizo-aware summaries, and a planner that respects the grid.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className={`size-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg`}>
                <f.icon className="size-6 text-white" />
              </div>
              <h3 className="mt-5 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="bg-card/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 grid md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">How it works</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Uptime in, action out</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: MessageSquare, title: "Drop it in", desc: "Paste a voice-note transcript, rough email, or a week of tasks. Any English is fine." },
            { icon: BrainCircuit, title: "Vulindlela translates intent", desc: "The AI shifts tone, extracts decisions, and tags tasks by required resources." },
            { icon: Wifi, title: "Ship on any bandwidth", desc: "You get a tiny text-only result that loads even on a shaky 3G line during recovery." },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-border bg-card p-6 relative"
            >
              <div className="size-10 rounded-xl flex items-center justify-center text-white" style={{ background: "var(--gradient-primary)" }}>
                <step.icon className="size-5" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mt-4">Step {i + 1}</div>
              <h3 className="font-semibold mt-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Loved by SA operators</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Voices from the path</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { name: "Thandi Mkhize", role: "Founder", company: "Kasi Logistics, Soweto", quote: "Debt-collection tone got two retailers to pay in a week. English used to freeze me — now it doesn't." },
            { name: "Sipho Nkosi", role: "Independent Contractor", company: "Durban", quote: "The Imbizo summariser turns a 12-minute WhatsApp voice note into a to-do list before the kettle boils." },
            { name: "Lerato van der Merwe", role: "Ops Lead", company: "Cape Town SME", quote: "Stage 4 hit and my day rearranged itself. Offline drafting first, video calls later. It just works." },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
                <div className="size-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: "var(--gradient-primary)" }}>
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Pricing</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Rand-priced. No dollar surprises.</h2>
          <p className="mt-3 text-muted-foreground">Start free. Scale when the SME grows.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-7 relative ${p.featured ? "border-primary bg-card shadow-2xl scale-[1.02]" : "border-border bg-card"}`}
              style={p.featured ? { boxShadow: "var(--shadow-glow)" } : undefined}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-white px-3 py-1 rounded-full" style={{ background: "var(--gradient-primary)" }}>
                  Most popular
                </div>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-sm text-muted-foreground">/month</span>}
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-success shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth/register"
                className={`mt-7 inline-flex w-full items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                  p.featured ? "text-white hover:opacity-90" : "border border-border hover:bg-muted"
                }`}
                style={p.featured ? { background: "var(--gradient-primary)" } : undefined}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-5 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">FAQ</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Questions, answered</h2>
        </div>
        <Faq />
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-10">
        <div className="rounded-3xl p-10 lg:p-16 text-center border border-border" style={{ background: "var(--gradient-hero)" }}>
          <Shield className="size-10 mx-auto text-primary mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to open the path?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Free to start. Loadshedding-ready. Built for the way South Africans actually work.</p>
          <Link to="/auth/register" className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            Start free <ArrowRight className="size-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> Setup takes 5 minutes — even at Stage 4
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
