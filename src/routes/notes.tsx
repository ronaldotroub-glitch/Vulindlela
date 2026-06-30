import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Loader2 } from "lucide-react";
import { summarizeNotes } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary, MarkdownPanel } from "@/components/page-header";
import { toast } from "sonner";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workly AI" },
      { name: "description", content: "Turn raw meeting transcripts into decisions and action items." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const fn = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const m = useMutation({
    mutationFn: () => fn({ data: { notes } }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={FileText}
        title="Meeting Notes Summarizer"
        description="Paste a transcript or rough notes — get key points, decisions, owners, and deadlines."
        tint="bg-violet-500/15 text-violet-400"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <Field label="Meeting notes / transcript">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} required rows={18} placeholder="Paste meeting notes here..." className={inputCls} />
          </Field>
          <button disabled={m.isPending || notes.length < 10} className={btnPrimary} style={{ background: "var(--gradient-primary)" }}>
            {m.isPending ? <><Loader2 className="size-4 animate-spin" /> Summarizing...</> : "Summarize"}
          </button>
        </form>
        <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Summary</h3>
          {m.data?.text ? (
            <MarkdownPanel><ReactMarkdown>{m.data.text}</ReactMarkdown></MarkdownPanel>
          ) : (
            <p className="text-sm text-muted-foreground">Your structured summary will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}