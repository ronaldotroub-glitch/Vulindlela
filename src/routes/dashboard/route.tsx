import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Bell, Search as SearchIcon } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { getUser, type AuthUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({ component: DashboardLayout });

function DashboardLayout() {
  const nav = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [user, setU] = useState<AuthUser | null>(null);

  useEffect(() => {
    const u = getUser();
    if (!u) {
      setU({ name: "Demo User", email: "demo@vulindlela.ai" });
    } else setU(u);
  }, [nav]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden md:block sticky top-0 h-screen">
        <DashboardSidebar collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
      </div>
      {/* Mobile drawer */}
      {drawer && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawer(false)} />
          <div className="relative h-full">
            <DashboardSidebar collapsed={false} onCollapse={() => {}} onClose={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
          <div className="h-16 px-4 lg:px-6 flex items-center gap-3">
            <button className="md:hidden p-2 -ml-2" onClick={() => setDrawer(!drawer)} aria-label="Menu">
              {drawer ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 w-full text-sm">
                <SearchIcon className="size-4 text-muted-foreground" />
                <input placeholder="Search across workspace..." className="flex-1 bg-transparent outline-none text-sm" />
                <kbd className="text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</kbd>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="size-9 rounded-lg border border-border bg-card hover:bg-muted flex items-center justify-center relative" aria-label="Notifications">
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-danger" />
              </button>
              <ThemeToggle />
              {user && (
                <div className="flex items-center gap-2 pl-2 ml-1 border-l border-border">
                  <div className="size-9 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ background: "var(--gradient-primary)" }}>
                    {user.name.slice(0, 1).toUpperCase()}
                  </div>
                  <div className="hidden lg:block text-sm">
                    <div className="font-medium leading-tight">{user.name}</div>
                    <div className="text-xs text-muted-foreground">{user.email}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}