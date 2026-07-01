import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ListTodo, Loader2, Wifi, WifiOff } from "lucide-react";
import { planTasks } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary, MarkdownPanel } from "@/components/page-header";
import { toast } from "sonner";
import { addHistory } from "@/lib/history";

export const Route = createFileRoute("/dashboard/planner")({
  head: () => ({
    meta: [
      { title: "Grid-Aware Task Planner — Vulindlela" },
      { name: "description", content: "Tag tasks by resource requirement. When the grid drops, Vulindlela reshuffles the day." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const fn = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<"day" | "week">("day");
  const [hours, setHours] = useState("8");
  const [gridStatus, setGridStatus] = useState<"online" | "offline">("online");
  const m = useMutation({
    mutationFn: () => fn({ data: { tasks, horizon, workingHours: hours, gridStatus } }),
    onSuccess: (d: { text: string }) => addHistory({ kind: "planner", title: `${horizon === 'day' ? 'Daily' : 'Weekly'} plan`, preview: tasks.slice(0, 120), content: d.text }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={ListTodo}
        title="Grid-Aware Task Planner"
        description="Tag each task by resource need. Vulindlela builds a day that survives loadshedding and reshuffles instantly when you go offline."
        tint="bg-teal-500/15 text-teal-400"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Plan horizon">
              <select value={horizon} onChange={(e) => setHorizon(e.target.value as "day" | "week")} className={inputCls}>
                <option value="day">Today</option>
                <option value="week">This week</option>
              </select>
            </Field>
            <Field label="Working hours / day">
              <input value={hours} onChange={(e) => setHours(e.target.value)} className={inputCls} />
            </Field>
          </div>
          <Field label="Current grid status">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setGridStatus("online")} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm border transition ${gridStatus === "online" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                <Wifi className="size-4" /> Online / Power on
              </button>
              <button type="button" onClick={() => setGridStatus("offline")} className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm border transition ${gridStatus === "offline" ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
                <WifiOff className="size-4" /> Loadshedding / Offline
              </button>
            </div>
          </Field>
          <Field label="Your tasks">
            <textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              rows={14}
              required
              placeholder={"Tag each task with its resource need. e.g.\n- Submit tender document (due Fri) [Requires High-Speed Wi-Fi]\n- Follow up 3 late invoices [Requires Desktop Power]\n- Read supplier quote PDFs [Can do offline on mobile]\n- Zoom pitch with retailer Wed 10:00 [Requires Wi-Fi + Power]"}
              className={inputCls}
            />
          </Field>
          <button disabled={m.isPending} className={btnPrimary} style={{ background: "var(--gradient-primary)" }}>
            {m.isPending ? <><Loader2 className="size-4 animate-spin" /> Reshuffling...</> : gridStatus === "offline" ? "Plan around loadshedding" : "Generate grid-aware plan"}
          </button>
        </form>
        <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your plan</h3>
          {m.data?.text ? (
            <MarkdownPanel><ReactMarkdown>{m.data.text}</ReactMarkdown></MarkdownPanel>
          ) : (
            <p className="text-sm text-muted-foreground">Your grid-aware, resource-triaged schedule will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}