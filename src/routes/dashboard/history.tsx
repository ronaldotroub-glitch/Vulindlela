import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Star, Trash2, Download, History as HistoryIcon, Mail, FileText, ListTodo, MessageSquare, Search as SearchIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { getHistory, toggleFavorite, deleteHistory, clearHistory, type HistoryItem } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "History — Vulindlela AI" }] }),
  component: HistoryPage,
});

const filters = [
  { key: "all", label: "All" },
  { key: "favorites", label: "Favorites" },
  { key: "email", label: "Emails" },
  { key: "notes", label: "Meetings" },
  { key: "planner", label: "Tasks" },
  { key: "research", label: "Research" },
  { key: "chat", label: "Chat" },
] as const;

function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof filters)[number]["key"]>("all");

  useEffect(() => {
    const load = () => setItems(getHistory());
    load();
    window.addEventListener("wp-history-change", load);
    return () => window.removeEventListener("wp-history-change", load);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (f === "favorites" && !i.favorite) return false;
      if (f !== "all" && f !== "favorites" && i.kind !== f) return false;
      if (q && !`${i.title} ${i.preview}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [items, q, f]);

  const exportAll = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "vulindlela-history.json"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-5 lg:px-8 py-8 max-w-6xl mx-auto w-full">
      <PageHeader icon={HistoryIcon} title="History" description="All your AI requests in one place. Search, favorite, and export." tint="bg-primary/15 text-primary" />

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 flex-1">
          <SearchIcon className="size-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search history..." className="flex-1 bg-transparent outline-none text-sm" />
        </div>
        <button onClick={exportAll} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted">
          <Download className="size-4" /> Export
        </button>
        <button onClick={() => { clearHistory(); toast.success("History cleared"); }} className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted text-danger">
          <Trash2 className="size-4" /> Clear
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {filters.map((x) => (
          <button
            key={x.key}
            onClick={() => setF(x.key)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${f === x.key ? "border-primary text-white" : "border-border bg-card text-muted-foreground hover:text-foreground"}`}
            style={f === x.key ? { background: "var(--gradient-primary)" } : undefined}
          >
            {x.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-14 text-center text-sm text-muted-foreground">
          <Search className="size-10 mx-auto opacity-30 mb-3" />
          No matching history yet. Generate something to fill this up!
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((i) => (
            <div key={i.id} className="rounded-2xl border border-border bg-card p-4 flex items-start gap-4">
              <KindIcon kind={i.kind} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-medium truncate">{i.title}</div>
                  <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{i.kind}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{i.preview}</p>
                <div className="text-xs text-muted-foreground/80 mt-2">{new Date(i.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleFavorite(i.id)} className="p-2 rounded-lg hover:bg-muted" aria-label="Favorite">
                  <Star className={`size-4 ${i.favorite ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                </button>
                <button onClick={() => deleteHistory(i.id)} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-danger" aria-label="Delete">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function KindIcon({ kind }: { kind: HistoryItem["kind"] }) {
  const map = {
    email: { i: Mail, c: "text-indigo-400 bg-indigo-500/15" },
    notes: { i: FileText, c: "text-violet-400 bg-violet-500/15" },
    planner: { i: ListTodo, c: "text-cyan-400 bg-cyan-500/15" },
    research: { i: Search, c: "text-emerald-400 bg-emerald-500/15" },
    chat: { i: MessageSquare, c: "text-amber-400 bg-amber-500/15" },
  } as const;
  const { i: Icon, c } = map[kind];
  return <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${c}`}><Icon className="size-5" /></div>;
}