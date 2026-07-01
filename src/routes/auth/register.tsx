import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { setUser } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Sign up — Vulindlela AI" }] }),
  component: Register,
});

function strength(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}

function Register() {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const s = useMemo(() => strength(password), [password]);
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-danger", "bg-danger", "bg-warning", "bg-accent", "bg-success"];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setUser({ name: name || email.split("@")[0], email });
    toast.success("Account created");
    nav({ to: "/dashboard" });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create your account</h1>
      <p className="text-sm text-muted-foreground mt-1">Start automating busywork in minutes.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field icon={User} label="Full name">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="w-full bg-transparent outline-none text-sm" />
        </Field>
        <Field icon={Mail} label="Work email">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full bg-transparent outline-none text-sm" />
        </Field>
        <Field icon={Lock} label="Password">
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full bg-transparent outline-none text-sm" />
        </Field>
        {password && (
          <div>
            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i < s ? colors[s] : "bg-muted"}`} />
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-1.5">{labels[s]}</div>
          </div>
        )}
        <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
          {loading ? <><Loader2 className="size-4 animate-spin" /> Creating...</> : "Create account"}
        </button>
      </form>
      <p className="text-xs text-muted-foreground text-center mt-6">
        Already have an account? <Link to="/auth/login" className="text-primary hover:underline">Log in</Link>
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