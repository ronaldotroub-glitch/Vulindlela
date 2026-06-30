import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Search, Loader2 } from "lucide-react";
import { summarizeResearch } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary, MarkdownPanel } from "@/components/page-header";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workly AI" },
      { name: "description", content: "Summarize technical articles, standards, and reports into plain language." },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const fn = useServerFn(summarizeResearch);
  const [content, setContent] = useState("");
  const [focus, setFocus] = useState("");
  const m = useMutation({
    mutationFn: () => fn({ data: { content, focus } }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        description="Paste technical content — get a TL;DR, key findings, technical details, and recommendations."
        tint="bg-emerald-500/15 text-emerald-400"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <Field label="What should the summary focus on? (optional)">
            <input value={focus} onChange={(e) => setFocus(e.target.value)} placeholder="e.g. fatigue limits, safety compliance" className={inputCls} />
          </Field>
          <Field label="Article / standard / report text">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows={16} placeholder="Paste the content here..." className={inputCls} />
          </Field>
          <button disabled={m.isPending} className={btnPrimary} style={{ background: "var(--gradient-primary)" }}>
            {m.isPending ? <><Loader2 className="size-4 animate-spin" /> Summarizing...</> : "Summarize"}
          </button>
        </form>
        <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Summary</h3>
          {m.data?.text ? (
            <MarkdownPanel><ReactMarkdown>{m.data.text}</ReactMarkdown></MarkdownPanel>
          ) : (
            <p className="text-sm text-muted-foreground">Findings and recommendations will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}