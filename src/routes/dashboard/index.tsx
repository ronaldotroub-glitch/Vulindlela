import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight,
  Clock, TrendingUp, CheckCircle2, AlertCircle, Sparkles,
} from "lucide-react";
import { getHistory, type HistoryItem } from "@/lib/history";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — ActivePilot AI" }] }),
  component: DashboardHome,
});

const tools = [
  { to: "/dashboard/email" as const, title: "Smart Email", icon: Mail, color: "from-indigo-500 to-violet-600", desc: "Draft polished emails" },
  { to: "/dashboard/notes" as const, title: "Meeting Summary", icon: FileText, color: "from-violet-500 to-fuchsia-600", desc: "Decisions & action items" },
  { to: "/dashboard/planner" as const, title: "Task Planner", icon: ListTodo, color: "from-cyan-500 to-indigo-600", desc: "Prioritize your day" },
  { to: "/dashboard/research" as const, title: "Research", icon: Search, color: "from-emerald-500 to-teal-600", desc: "Summarize anything" },
  { to: "/dashboard/chat" as const, title: "AI Chat", icon: MessageSquare, color: "from-amber-500 to-orange-600", desc: "Conversational copilot" },
];

function DashboardHome() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  useEffect(() => {
    const load = () => setHistory(getHistory());
    load();
    window.addEventListener("wp-history-change", load);
    return () => window.removeEventListener("wp-history-change", load);
  }, []);

  const today = new Date();
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening";

  const widgets = [
    { label: "Today's tasks", value: "7", sub: "3 high priority", icon: ListTodo, tint: "text-indigo-400 bg-indigo-500/15" },
    { label: "Meetings", value: "4", sub: "Next at 2:30 PM", icon: Clock, tint: "text-violet-400 bg-violet-500/15" },
    { label: "AI requests", value: String(history.length), sub: "this week", icon: Sparkles, tint: "text-cyan-400 bg-cyan-500/15" },
    { label: "Productivity", value: "87%", sub: "+12% vs last week", icon: TrendingUp, tint: "text-emerald-400 bg-emerald-500/15" },
  ];

  return (
    <div className="px-5 lg:px-8 py-8 max-w-7xl mx-auto w-full">
      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-border p-8 lg:p-10"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-primary" /> Powered by AI
        </div>
        <h1 className="mt-4 text-3xl lg:text-4xl font-bold">{greeting}, ready to ship?</h1>
        <p className="mt-2 text-muted-foreground max-w-xl">Pick a tool below — or just open AI Chat and describe what you need.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/dashboard/chat" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition" style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
            Open AI Chat <ArrowRight className="size-4" />
          </Link>
          <Link to="/dashboard/email" className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border border-border bg-card/60 backdrop-blur hover:bg-card transition">
            Draft an email
          </Link>
        </div>
      </motion.div>

      {/* Widgets */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((w, i) => (
          <motion.div
            key={w.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className={`size-10 rounded-xl flex items-center justify-center ${w.tint}`}>
              <w.icon className="size-5" />
            </div>
            <div className="mt-4 text-2xl font-bold">{w.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{w.label}</div>
            <div className="text-[11px] text-muted-foreground/80 mt-2">{w.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Tools */}
      <div className="mt-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-semibold">Productivity tools</h2>
            <p className="text-sm text-muted-foreground mt-1">Pick a tool to get started.</p>
          </div>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((t, i) => (
            <motion.div key={t.to} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link to={t.to} className="group block rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all hover:-translate-y-0.5">
                <div className={`size-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-lg`}>
                  <t.icon className="size-5 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  Open <ArrowRight className="size-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent AI requests */}
      <div className="mt-10 grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Recent AI requests</h3>
            <Link to="/dashboard/history" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {history.length === 0 ? (
            <div className="mt-6 py-10 text-center text-sm text-muted-foreground">
              <CheckCircle2 className="size-10 mx-auto opacity-30 mb-3" />
              No requests yet — try the Email Generator.
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="py-3 flex items-center gap-3">
                  <KindBadge kind={h.kind} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{h.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{h.preview}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{new Date(h.createdAt).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold flex items-center gap-2"><AlertCircle className="size-4 text-warning" /> Upcoming deadlines</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { t: "Submit design review", d: "Today, 5:00 PM" },
              { t: "Client progress report", d: "Tomorrow" },
              { t: "Supplier quote follow-up", d: "Thu, Jul 3" },
            ].map((d) => (
              <li key={d.t} className="flex items-center justify-between gap-3">
                <span className="truncate">{d.t}</span>
                <span className="text-xs text-muted-foreground shrink-0">{d.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function KindBadge({ kind }: { kind: HistoryItem["kind"] }) {
  const map: Record<HistoryItem["kind"], { icon: typeof Mail; cls: string }> = {
    email: { icon: Mail, cls: "text-indigo-400 bg-indigo-500/15" },
    notes: { icon: FileText, cls: "text-violet-400 bg-violet-500/15" },
    planner: { icon: ListTodo, cls: "text-cyan-400 bg-cyan-500/15" },
    research: { icon: Search, cls: "text-emerald-400 bg-emerald-500/15" },
    chat: { icon: MessageSquare, cls: "text-amber-400 bg-amber-500/15" },
  };
  const { icon: Icon, cls } = map[kind];
  return <div className={`size-8 rounded-lg flex items-center justify-center shrink-0 ${cls}`}><Icon className="size-4" /></div>;
}