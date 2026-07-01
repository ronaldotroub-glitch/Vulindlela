import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Loader2 } from "lucide-react";
import { summarizeNotes } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary, MarkdownPanel } from "@/components/page-header";
import { toast } from "sonner";
import { addHistory } from "@/lib/history";

export const Route = createFileRoute("/dashboard/notes")({
  head: () => ({
    meta: [
      { title: "Imbizo Voice & Meeting Summarizer — Vulindlela" },
      { name: "description", content: "Turn long WhatsApp voice notes and Imbizos into a 3-sentence TL;DR, action items, and hard deadlines." },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const fn = useServerFn(summarizeNotes);
  const [notes, setNotes] = useState("");
  const m = useMutation({
    mutationFn: () => fn({ data: { notes } }),
    onSuccess: (d: { text: string }) => addHistory({ kind: "notes", title: 'Meeting summary', preview: notes.slice(0, 120), content: d.text }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={FileText}
        title="Imbizo Voice & Meeting Summarizer"
        description="Paste a WhatsApp voice-note transcript or Imbizo minutes — get a 3-sentence TL;DR, action items, decisions and hard deadlines."
        tint="bg-amber-500/15 text-amber-400"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => { e.preventDefault(); m.mutate(); }}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <Field label="Voice-note transcript or meeting minutes">
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} required rows={18} placeholder={"Paste the transcript of a long WhatsApp voice note, an Imbizo, or virtual meeting.\n\nVulindlela returns a low-bandwidth, text-only summary that loads on 3G."} className={inputCls} />
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