import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Clock, Zap, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workly AI" },
      { name: "description", content: "Your AI workplace assistant for engineering teams. Automate emails, meetings, planning, and research." },
      { property: "og:title", content: "Workly AI Dashboard" },
      { property: "og:description", content: "Your AI workplace assistant for engineering teams." },
    ],
  }),
  component: Index,
});

const tools = [
  { to: "/email" as const, title: "Smart Email Generator", desc: "Draft polished emails in seconds with tone control.", icon: Mail, color: "from-sky-500 to-blue-600" },
  { to: "/notes" as const, title: "Meeting Notes Summarizer", desc: "Turn raw transcripts into decisions and action items.", icon: FileText, color: "from-violet-500 to-purple-600" },
  { to: "/planner" as const, title: "AI Task Planner", desc: "Prioritize your day using urgency + importance.", icon: ListTodo, color: "from-pink-500 to-rose-600" },
  { to: "/research" as const, title: "Research Assistant", desc: "Summarize standards, papers, and manuals fast.", icon: Search, color: "from-emerald-500 to-teal-600" },
  { to: "/chat" as const, title: "AI Chat", desc: "Ask anything — your workplace copilot in one window.", icon: MessageSquare, color: "from-amber-500 to-orange-600" },
];

function Index() {
  return (
    <div className="px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full">
      <section
        className="relative overflow-hidden rounded-3xl border border-border p-10 lg:p-14"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
          <Sparkles className="size-3.5" /> Powered by AI
        </div>
        <h1 className="mt-5 text-4xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl">
          Your{" "}
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-accent-purple)" }}>
            AI workplace
          </span>{" "}
          assistant
        </h1>
        <p className="mt-4 text-base lg:text-lg text-white/70 max-w-2xl">
          Automate emails, summarize meetings, plan your week, and research smarter — all from one beautifully simple workspace.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/email"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            Start with Email <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10 transition"
          >
            Open AI Chat
          </Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Clock, value: "8.5h", label: "Hours saved per week", tint: "bg-rose-500/15 text-rose-400" },
          { icon: Zap, value: "12×", label: "Faster response time", tint: "bg-violet-500/15 text-violet-400" },
          { icon: Lock, value: "100%", label: "Editable & private", tint: "bg-emerald-500/15 text-emerald-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
            <div className={`size-11 rounded-xl flex items-center justify-center ${s.tint}`}>
              <s.icon className="size-5" />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 pb-10">
        <h2 className="text-xl font-semibold">Productivity tools</h2>
        <p className="text-sm text-muted-foreground mt-1">Pick a tool to get started.</p>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className="group rounded-2xl border border-border bg-card p-5 hover:border-primary/50 hover:bg-card/80 transition-all"
              >
                <div className={`size-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                  <Icon className="size-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold text-primary">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Open tool <ArrowRight className="size-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}