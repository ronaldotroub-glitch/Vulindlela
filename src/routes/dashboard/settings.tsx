import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Settings as SettingsIcon, Sun, Moon, Trash2, Save } from "lucide-react";
import { PageHeader, Field, inputCls } from "@/components/page-header";
import { useTheme } from "@/lib/theme";
import { getUser, setUser } from "@/lib/auth";
import { clearHistory } from "@/lib/history";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — Vulindlela AI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("English");
  const [notif, setNotif] = useState(true);

  useEffect(() => {
    const u = getUser();
    if (u) { setName(u.name); setEmail(u.email); }
  }, []);

  const save = () => {
    setUser({ name, email });
    toast.success("Settings saved");
  };

  return (
    <div className="px-5 lg:px-8 py-8 max-w-4xl mx-auto w-full">
      <PageHeader icon={SettingsIcon} title="Settings" description="Manage your profile, appearance, and account." />

      <Section title="Profile">
        <Field label="Full name">
          <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </Field>
        <Field label="Email">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </Field>
      </Section>

      <Section title="Appearance">
        <div className="flex gap-2">
          <button onClick={() => setTheme("dark")} className={`flex-1 rounded-xl border p-4 text-sm flex flex-col items-start gap-2 transition ${theme === "dark" ? "border-primary" : "border-border"}`}>
            <Moon className="size-4" /> <span>Dark</span> <span className="text-xs text-muted-foreground">Default</span>
          </button>
          <button onClick={() => setTheme("light")} className={`flex-1 rounded-xl border p-4 text-sm flex flex-col items-start gap-2 transition ${theme === "light" ? "border-primary" : "border-border"}`}>
            <Sun className="size-4" /> <span>Light</span> <span className="text-xs text-muted-foreground">Bright</span>
          </button>
        </div>
      </Section>

      <Section title="Preferences">
        <Field label="Language">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className={inputCls}>
            {["English", "Spanish", "French", "German", "Portuguese"].map((l) => <option key={l}>{l}</option>)}
          </select>
        </Field>
        <label className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
          <div>
            <div className="text-sm font-medium">Email notifications</div>
            <div className="text-xs text-muted-foreground">Weekly productivity report and important updates</div>
          </div>
          <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} className="size-4 accent-primary" />
        </label>
      </Section>

      <Section title="Data & privacy">
        <button
          onClick={() => { if (confirm("Clear all local history?")) { clearHistory(); toast.success("History cleared"); } }}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm hover:bg-muted text-danger"
        >
          <Trash2 className="size-4" /> Clear all history
        </button>
      </Section>

      <div className="mt-8 flex justify-end">
        <button onClick={save} className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90" style={{ background: "var(--gradient-primary)" }}>
          <Save className="size-4" /> Save changes
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 space-y-4 mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}