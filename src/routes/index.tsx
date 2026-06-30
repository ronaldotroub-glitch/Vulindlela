import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Check,
  Sparkles, Bot, Zap, Clock, Shield, Star, ChevronDown, BrainCircuit,
} from "lucide-react";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ActivePilot AI — Your AI Workplace Productivity Assistant" },
      { name: "description", content: "Automate emails, meeting summaries, task planning, research, and chat with one intelligent AI assistant." },
      { property: "og:title", content: "ActivePilot AI — Your AI Workplace Productivity Assistant" },
      { property: "og:description", content: "One AI assistant for emails, meetings, planning, and research." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Mail, title: "Smart Email Generator", desc: "Draft polished emails in seconds with tone, audience, and length control.", color: "from-indigo-500 to-violet-600" },
  { icon: FileText, title: "Meeting Notes Summarizer", desc: "Turn raw transcripts into decisions, owners, and deadlines automatically.", color: "from-violet-500 to-fuchsia-600" },
  { icon: ListTodo, title: "AI Task Planner", desc: "Prioritize and time-block your day or week based on urgency and workload.", color: "from-cyan-500 to-indigo-600" },
  { icon: Search, title: "Research Assistant", desc: "Summarize technical standards, papers, and reports into plain language.", color: "from-emerald-500 to-teal-600" },
  { icon: MessageSquare, title: "AI Chatbot", desc: "Ask anything — your workplace copilot in one conversational interface.", color: "from-amber-500 to-orange-600" },
];

const stats = [
  { value: 80, suffix: "%", label: "Reduction in repetitive work" },
  { value: 3, suffix: "×", label: "Faster task completion" },
  { value: 24, suffix: "/7", label: "AI availability" },
  { value: 99, suffix: "%", label: "Productivity improvement" },
];

const faqs = [
  { q: "What is ActivePilot AI?", a: "ActivePilot AI is an AI-powered workplace assistant that automates emails, meeting summaries, task planning, research, and workplace conversations — all in one place." },
  { q: "Which AI models do you use?", a: "We use modern frontier models including Gemini, GPT, and Claude through a unified, modular gateway. You can switch models without changing your workflow." },
  { q: "Is my data secure?", a: "Yes. Your data is encrypted in transit and at rest. We do not train any model on your private content, and you can delete your data at any time." },
  { q: "Can I integrate with my tools?", a: "Yes — calendar, document, CRM, and project-management integrations are on our roadmap. The architecture is designed for easy extension." },
  { q: "Is there a free plan?", a: "Yes. You can start free with generous limits and upgrade only when you need more capacity or premium features." },
];

const plans = [
  { name: "Free", price: "$0", desc: "Try the assistant", features: ["5 AI requests/day", "Email & summary tools", "Community support"], cta: "Start free", featured: false },
  { name: "Professional", price: "$19", desc: "For power users", features: ["Unlimited AI requests", "All 5 modules", "History & analytics", "Priority models", "Priority support"], cta: "Start Pro trial", featured: true },
  { name: "Enterprise", price: "Custom", desc: "For organizations", features: ["SSO + role management", "SOC 2 compliance", "Custom integrations", "Dedicated success manager", "SLA"], cta: "Contact sales", featured: false },
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
              <Sparkles className="size-3.5 text-primary" /> Powered by AI · Built for teams
            </div>
            <h1 className="mt-5 text-4xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Your{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-primary)" }}>AI Workplace</span>{" "}
              Productivity Assistant
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-xl">
              Automate emails, meeting summaries, task planning, research, and workplace conversations with one intelligent assistant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/auth/register" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
                Get Started <ArrowRight className="size-4" />
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold border border-border bg-card/60 backdrop-blur hover:bg-card transition">
                Try Demo
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> No credit card</div>
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> 5-min setup</div>
              <div className="flex items-center gap-1.5"><Check className="size-3.5 text-success" /> Cancel anytime</div>
            </div>
          </motion.div>

          {/* Animated illustration */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
            <div className="relative rounded-3xl border border-border bg-card/70 backdrop-blur-xl p-6 shadow-2xl" style={{ boxShadow: "var(--shadow-glow)" }}>
              <div className="flex items-center gap-2 pb-4 border-b border-border">
                <div className="size-2.5 rounded-full bg-danger/80" />
                <div className="size-2.5 rounded-full bg-warning/80" />
                <div className="size-2.5 rounded-full bg-success/80" />
                <div className="ml-3 text-xs text-muted-foreground">activepilot.ai/chat</div>
              </div>
              <div className="pt-5 space-y-4">
                <div className="flex justify-end">
                  <div className="rounded-2xl px-4 py-2.5 text-sm text-white max-w-[80%]" style={{ background: "var(--gradient-primary)" }}>
                    Summarize today's project standup and draft an update for the client.
                  </div>
                </div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex gap-3">
                  <div className="size-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--gradient-primary)" }}>
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 text-sm bg-muted text-foreground/90 max-w-[85%] space-y-2">
                    <p><strong>Standup summary</strong></p>
                    <p>3 blockers cleared, design review on Thursday, QA running ahead of schedule.</p>
                    <p className="text-xs text-muted-foreground">✶ Draft email ready · 87 words</p>
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
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Features</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Everything your team needs</h2>
          <p className="mt-3 text-muted-foreground">Five AI-powered modules, one beautifully simple workspace.</p>
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
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Workflow</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">From input to output in seconds</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { icon: MessageSquare, title: "User Input", desc: "Describe what you need in plain language." },
            { icon: BrainCircuit, title: "AI Processing", desc: "ActivePilot routes your request to the best model." },
            { icon: Zap, title: "Generated Output", desc: "Polished, editable result — ready to ship." },
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
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">Loved by teams</div>
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">What our users say</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            { name: "Sarah Chen", role: "Engineering Manager", company: "Acme Robotics", quote: "ActivePilot saves my team 10+ hours every week. The meeting summarizer alone is worth it." },
            { name: "Marcus Patel", role: "Senior Project Manager", company: "BuildCo", quote: "The task planner thinks the way I do — but ten times faster. Game changer." },
            { name: "Aisha Mensah", role: "Research Lead", company: "GreenGrid", quote: "I research engineering standards daily. ActivePilot summarizes ISO docs in seconds. Brilliant." },
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
          <h2 className="text-3xl lg:text-4xl font-bold mt-2">Simple, transparent pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more.</p>
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
          <h2 className="text-3xl lg:text-4xl font-bold">Ready to reclaim your week?</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Start free. Cancel anytime. Your team will thank you.</p>
          <Link to="/auth/register" className="mt-7 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            Get Started Free <ArrowRight className="size-4" />
          </Link>
          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="size-3.5" /> Set up in under 5 minutes
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
