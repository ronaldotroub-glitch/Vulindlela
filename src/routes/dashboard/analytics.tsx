import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, TrendingUp, Clock, Zap } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getHistory, type HistoryItem } from "@/lib/history";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — ActivePilot AI" }] }),
  component: Analytics,
});

const COLORS = ["#4F46E5", "#7C3AED", "#06B6D4", "#22C55E", "#F59E0B"];

function Analytics() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    window.addEventListener("wp-history-change", load);
    return () => window.removeEventListener("wp-history-change", load);
  }, []);

  const byDay = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() - (6 - i));
      return { label: d.toLocaleDateString(undefined, { weekday: "short" }), date: d.toDateString(), count: 0 };
    });
    items.forEach((i) => {
      const day = days.find((d) => d.date === new Date(i.createdAt).toDateString());
      if (day) day.count++;
    });
    return days;
  }, [items]);

  const byKind = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((i) => { counts[i.kind] = (counts[i.kind] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [items]);

  const total = items.length;
  const hoursSaved = (total * 0.4).toFixed(1);

  const stats = [
    { label: "Total AI requests", value: String(total), icon: Zap, tint: "text-indigo-400 bg-indigo-500/15" },
    { label: "Hours saved", value: `${hoursSaved}h`, icon: Clock, tint: "text-emerald-400 bg-emerald-500/15" },
    { label: "Productivity boost", value: total > 0 ? "+24%" : "—", icon: TrendingUp, tint: "text-cyan-400 bg-cyan-500/15" },
    { label: "Weekly avg", value: String(Math.round(total / 4)), icon: BarChart3, tint: "text-violet-400 bg-violet-500/15" },
  ];

  return (
    <div className="px-5 lg:px-8 py-8 max-w-6xl mx-auto w-full">
      <PageHeader icon={BarChart3} title="Analytics" description="Track AI usage, productivity gains, and weekly progress." tint="bg-primary/15 text-primary" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
            <div className={`size-10 rounded-xl flex items-center justify-center ${s.tint}`}><s.icon className="size-5" /></div>
            <div className="text-2xl font-bold mt-4">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-4">AI requests · last 7 days</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={byDay}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" stroke="currentColor" opacity={0.5} fontSize={11} />
                <YAxis stroke="currentColor" opacity={0.5} fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="count" stroke="url(#g1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold mb-4">Tool usage</h3>
          <div className="h-64">
            {byKind.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No data yet</div>
            ) : (
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={byKind} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                    {byKind.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-border bg-card p-5">
        <h3 className="font-semibold mb-4">Weekly volume by tool</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={byKind}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="currentColor" opacity={0.5} fontSize={11} />
              <YAxis stroke="currentColor" opacity={0.5} fontSize={11} allowDecimals={false} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Bar dataKey="value" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}