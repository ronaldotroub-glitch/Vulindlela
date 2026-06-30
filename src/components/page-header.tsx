import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  description,
  tint = "bg-primary/15 text-primary",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tint?: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className={`size-12 rounded-xl flex items-center justify-center ${tint}`}>
        <Icon className="size-6" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{description}</p>
      </div>
    </div>
  );
}

export const inputCls =
  "w-full rounded-lg bg-input/60 border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow transition disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</span>
      {children}
    </label>
  );
}

export function MarkdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-foreground prose-headings:font-semibold prose-p:text-foreground/90 prose-strong:text-foreground prose-a:text-primary prose-code:text-primary prose-li:text-foreground/90 prose-table:text-sm prose-th:text-foreground prose-td:text-foreground/90">
      {children}
    </div>
  );
}