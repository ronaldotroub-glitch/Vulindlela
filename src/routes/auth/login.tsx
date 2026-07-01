import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { setUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Log in — Vulindlela AI" }] }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setUser({ name: email.split("@")[0] || "User", email });
    toast.success("Welcome back!");
    nav({ to: "/dashboard" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back</h1>
      <p className="text-sm text-muted-foreground mt-1">Log in to your Vulindlela AI workspace.</p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { name: "Google", c: "#4285F4" },
          { name: "Microsoft", c: "#00A4EF" },
          { name: "GitHub", c: "#fff" },
        ].map((p) => (
          <button key={p.name} onClick={() => toast.info(`${p.name} login is a demo placeholder.`)} className="border border-border bg-card rounded-lg py-2 text-sm hover:bg-muted transition">
            {p.name}
          </button>
        ))}
      </div>
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="flex-1 h-px bg-border" /> or continue with email <div className="flex-1 h-px bg-border" />
      </div>
      <form onSubmit={submit} className="space-y-4">
        <Field icon={Mail} label="Email">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent outline-none text-sm" />
        </Field>
        <Field icon={Lock} label="Password">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-transparent outline-none text-sm" />
        </Field>
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-primary" /> Remember me</label>
          <Link to="/auth/forgot" className="text-primary hover:underline">Forgot password?</Link>
        </div>
        <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
          {loading ? <><Loader2 className="size-4 animate-spin" /> Logging in...</> : "Log in"}
        </button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-6">
        New to Vulindlela? <Link to="/auth/register" className="text-primary hover:underline">Create an account</Link>
      </p>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: typeof Mail; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      <div className="flex items-center gap-2 rounded-lg border border-border bg-input px-3 py-2.5 focus-within:ring-2 focus-within:ring-primary/40">
        <Icon className="size-4 text-muted-foreground shrink-0" />
        {children}
      </div>
    </label>
  );
}