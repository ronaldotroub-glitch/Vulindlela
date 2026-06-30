import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({ meta: [{ title: "Reset password — WorkPilot AI" }] }),
  component: Forgot,
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent");
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <p className="text-sm text-muted-foreground mt-1">We'll email you a secure reset link.</p>
      {sent ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
          <div className="size-12 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto"><Check className="size-6" /></div>
          <p className="mt-3 text-sm">Check <strong>{email}</strong> for a reset link.</p>
          <Link to="/auth/login" className="mt-4 inline-block text-sm text-primary hover:underline">Back to log in</Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="block text-xs font-medium text-muted-foreground mb-1.5">Email</span>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2.5">
              <Mail className="size-4 text-muted-foreground" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent outline-none text-sm" />
            </div>
          </label>
          <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
            {loading ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : "Send reset link"}
          </button>
          <p className="text-xs text-muted-foreground text-center">
            Remembered it? <Link to="/auth/login" className="text-primary hover:underline">Back to log in</Link>
          </p>
        </form>
      )}
    </div>
  );
}