import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ListTodo, Loader2 } from "lucide-react";
import { planTasks } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary, MarkdownPanel } from "@/components/page-header";
import { toast } from "sonner";
import { addHistory } from "@/lib/history";

export const Route = createFileRoute("/dashboard/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workly AI" },
      { name: "description", content: "Prioritize and time-block your day or week with AI." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const fn = useServerFn(planTasks);
  const [tasks, setTasks] = useState("");
  const [horizon, setHorizon] = useState<"day" | "week">("day");
  const [hours, setHours] = useState("8");
  const m = useMutation({
    mutationFn: () => fn({ data: { tasks, horizon, workingHours: hours } }),
    onSuccess: (d: { text: string }) => addHistory({ kind: "planner", title: `${horizon === 'day' ? 'Daily' : 'Weekly'} plan`, preview: tasks.slice(0, 120), content: d.text }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={ListTodo}
        title="AI Task Planner"
        description="List your tasks (with deadlines or urgency notes) and get a prioritized, time-blocked schedule."
        tint="bg-pink-500/15 text-pink-400"
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
          <Field label="Your tasks">
            <textarea
              value={tasks}
              onChange={(e) => setTasks(e.target.value)}
              rows={14}
              required
              placeholder={"e.g.\n- Finish stress analysis report (due Friday)\n- Review supplier quotes — urgent\n- Prep for client call Wed 10am\n- Draft project timeline"}
              className={inputCls}
            />
          </Field>
          <button disabled={m.isPending} className={btnPrimary} style={{ background: "var(--gradient-primary)" }}>
            {m.isPending ? <><Loader2 className="size-4 animate-spin" /> Planning...</> : "Generate plan"}
          </button>
        </form>
        <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your plan</h3>
          {m.data?.text ? (
            <MarkdownPanel><ReactMarkdown>{m.data.text}</ReactMarkdown></MarkdownPanel>
          ) : (
            <p className="text-sm text-muted-foreground">Prioritized schedule will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}