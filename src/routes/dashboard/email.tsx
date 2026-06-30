import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Mail, Loader2, Copy, Check } from "lucide-react";
import { generateEmail } from "@/lib/ai.functions";
import { PageHeader, Field, inputCls, btnPrimary } from "@/components/page-header";
import { toast } from "sonner";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workly AI" },
      { name: "description", content: "Draft polished engineering emails with tone control." },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const fn = useServerFn(generateEmail);
  const [recipient, setRecipient] = useState("");
  const [recipientType, setRecipientType] = useState("Client");
  const [tone, setTone] = useState("Formal");
  const [purpose, setPurpose] = useState("");
  const [context, setContext] = useState("");
  const [copied, setCopied] = useState(false);

  const m = useMutation({
    mutationFn: () => fn({ data: { recipient, recipientType, tone, purpose, context } }),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="px-6 lg:px-10 py-8 max-w-6xl mx-auto w-full">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        description="Generate professional emails tailored to recipient type and tone."
        tint="bg-sky-500/15 text-sky-400"
      />
      <div className="grid lg:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            m.mutate();
          }}
          className="rounded-2xl border border-border bg-card p-6 space-y-4"
        >
          <Field label="Recipient name">
            <input value={recipient} onChange={(e) => setRecipient(e.target.value)} required placeholder="e.g. Jane Smith" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Recipient type">
              <select value={recipientType} onChange={(e) => setRecipientType(e.target.value)} className={inputCls}>
                {["Client", "Project Manager", "Supplier", "Engineering Team", "Manager", "HR"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <Field label="Tone">
              <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputCls}>
                {["Formal", "Informal", "Persuasive", "Friendly", "Apologetic", "Urgent"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Purpose">
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} required placeholder="e.g. Send project progress update" className={inputCls} />
          </Field>
          <Field label="Additional context (optional)">
            <textarea value={context} onChange={(e) => setContext(e.target.value)} rows={5} placeholder="Key points, dates, attachments, etc." className={inputCls} />
          </Field>
          <button disabled={m.isPending} className={btnPrimary} style={{ background: "var(--gradient-primary)" }}>
            {m.isPending ? <><Loader2 className="size-4 animate-spin" /> Generating...</> : "Generate email"}
          </button>
        </form>

        <div className="rounded-2xl border border-border bg-card p-6 min-h-[400px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Generated email</h3>
            {m.data?.text && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(m.data!.text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? <><Check className="size-3.5" /> Copied</> : <><Copy className="size-3.5" /> Copy</>}
              </button>
            )}
          </div>
          {m.data?.text ? (
            <pre className="whitespace-pre-wrap text-sm text-foreground/90 font-sans leading-relaxed">{m.data.text}</pre>
          ) : (
            <p className="text-sm text-muted-foreground">Your email will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}