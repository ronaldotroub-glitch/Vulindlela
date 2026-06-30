import { Link, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Mail, FileText, ListTodo, Search, MessageSquare, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Notes Summarizer", icon: FileText },
  { to: "/planner", label: "Task Planner", icon: ListTodo },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
] as const;

export function AppSidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="size-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-sidebar-foreground">Workly AI</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">by CAPACITI</div>
        </div>
      </div>
      <div className="px-3 pt-4 pb-2 text-[11px] uppercase tracking-wider text-muted-foreground">Workspace</div>
      <nav className="flex flex-col gap-0.5 px-2">
        {nav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto px-5 py-4 border-t border-sidebar-border">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Powered by</div>
        <div className="text-sm font-semibold text-sidebar-foreground mt-1">CAPACITI</div>
      </div>
    </aside>
  );
}