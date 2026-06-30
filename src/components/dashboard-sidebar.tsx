import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, Mail, FileText, ListTodo, Search, MessageSquare,
  History, BarChart3, Settings, LogOut, ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Brand } from "./brand";
import { setUser } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";

const main = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/email", label: "Email Generator", icon: Mail, exact: false },
  { to: "/dashboard/notes", label: "Meeting Summary", icon: FileText, exact: false },
  { to: "/dashboard/planner", label: "Task Planner", icon: ListTodo, exact: false },
  { to: "/dashboard/research", label: "Research", icon: Search, exact: false },
  { to: "/dashboard/chat", label: "AI Chat", icon: MessageSquare, exact: false },
] as const;

const secondary = [
  { to: "/dashboard/history", label: "History", icon: History },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardSidebar({ collapsed, onCollapse, onClose }: { collapsed: boolean; onCollapse: () => void; onClose?: () => void }) {
  const { pathname } = useLocation();
  const nav = useNavigate();

  return (
    <aside className={cn("flex flex-col bg-sidebar border-r border-sidebar-border transition-all", collapsed ? "w-16" : "w-60")}>
      <div className={cn("h-16 flex items-center px-4 border-b border-sidebar-border", collapsed && "justify-center px-2")}>
        {collapsed ? <Brand size="sm" /> : <Brand />}
      </div>
      <Section label="Workspace" collapsed={collapsed}>
        {main.map((i) => <NavItem key={i.to} item={i} active={i.exact ? pathname === i.to : pathname === i.to || pathname.startsWith(i.to + "/")} collapsed={collapsed} onClick={onClose} />)}
      </Section>
      <Section label="Account" collapsed={collapsed}>
        {secondary.map((i) => <NavItem key={i.to} item={i} active={pathname.startsWith(i.to)} collapsed={collapsed} onClick={onClose} />)}
      </Section>
      <div className="mt-auto p-2 border-t border-sidebar-border">
        <button
          onClick={() => { setUser(null); nav({ to: "/" }); }}
          className={cn("w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition", collapsed && "justify-center px-0")}
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed && "Logout"}
        </button>
        <button
          onClick={onCollapse}
          className={cn("hidden md:flex w-full items-center gap-3 rounded-lg px-3 py-2 mt-1 text-xs text-muted-foreground hover:bg-sidebar-accent transition", collapsed && "justify-center px-0")}
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </aside>
  );
}

function Section({ label, collapsed, children }: { label: string; collapsed: boolean; children: React.ReactNode }) {
  return (
    <div className="px-2 pt-4">
      {!collapsed && <div className="px-3 pb-2 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold">{label}</div>}
      <nav className="flex flex-col gap-0.5">{children}</nav>
    </div>
  );
}

function NavItem({ item, active, collapsed, onClick }: { item: { to: string; label: string; icon: React.ElementType }; active: boolean; collapsed: boolean; onClick?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors relative",
        active
          ? "bg-sidebar-accent text-foreground font-medium"
          : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r-full" style={{ background: "var(--gradient-primary)" }} />}
      <Icon className="size-4 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}