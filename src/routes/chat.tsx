import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { MessageSquare, Send, Loader2, Sparkles } from "lucide-react";
import { PageHeader, MarkdownPanel } from "@/components/page-header";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — Workly AI" },
      { name: "description", content: "Conversational AI workplace assistant for engineering teams." },
    ],
  }),
  component: ChatPage,
});

const transport = new DefaultChatTransport({ api: "/api/chat" });

const suggestions = [
  "Draft an email to the client about a 2-week project delay.",
  "Plan my tasks for tomorrow: 3 design reviews, supplier call, report.",
  "Summarize ISO 9001 in plain language.",
  "Turn these meeting notes into action items.",
];

function ChatPage() {
  const { messages, sendMessage, status } = useChat({ transport });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const loading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (!loading) inputRef.current?.focus(); }, [loading]);

  const submit = async (text: string) => {
    const v = text.trim();
    if (!v || loading) return;
    setInput("");
    await sendMessage({ text: v });
  };

  return (
    <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto w-full flex flex-col h-[calc(100vh-3rem)]">
      <PageHeader
        icon={MessageSquare}
        title="AI Chat"
        description="Ask anything — drafting, summarizing, planning, research."
        tint="bg-amber-500/15 text-amber-400"
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-2xl border border-border bg-card p-6 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="size-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="size-7 text-white" />
            </div>
            <h3 className="text-lg font-semibold">How can I help today?</h3>
            <p className="text-sm text-muted-foreground mt-1">Try one of these:</p>
            <div className="mt-5 grid sm:grid-cols-2 gap-2 max-w-xl w-full">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="text-left rounded-xl border border-border bg-background/40 hover:bg-background/80 hover:border-primary/40 transition p-3 text-sm text-foreground/90"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const text = msg.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  isUser
                    ? "text-white"
                    : "bg-secondary text-foreground border border-border"
                }`}
                style={isUser ? { background: "var(--gradient-primary)" } : undefined}
              >
                {isUser ? (
                  <p className="text-sm whitespace-pre-wrap">{text}</p>
                ) : (
                  <MarkdownPanel><ReactMarkdown>{text || "..."}</ReactMarkdown></MarkdownPanel>
                )}
              </div>
            </div>
          );
        })}

        {status === "submitted" && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-secondary border border-border text-sm text-muted-foreground inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); submit(input); }}
        className="mt-4 flex items-end gap-2 rounded-2xl border border-border bg-card p-2"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(input); }
          }}
          placeholder="Ask Workly AI..."
          rows={1}
          className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none max-h-40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow disabled:opacity-50"
          style={{ background: "var(--gradient-primary)" }}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          Send
        </button>
      </form>
    </div>
  );
}