import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Brand } from "@/components/brand";

export const Route = createFileRoute("/auth")({ component: AuthLayout });

function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="flex flex-col">
        <div className="px-6 lg:px-10 py-6">
          <Brand />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
        <div className="px-6 lg:px-10 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} ActivePilot AI · <Link to="/" className="hover:text-foreground">Back home</Link>
        </div>
      </div>
      <div className="hidden lg:flex relative overflow-hidden border-l border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="relative m-auto max-w-sm p-10 text-center">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold">ActivePilot AI</div>
          <h2 className="mt-3 text-3xl font-bold leading-tight">Your AI workplace assistant — at your fingertips.</h2>
          <p className="mt-4 text-sm text-muted-foreground">Join thousands of engineers and PMs automating busywork so they can focus on real work.</p>
        </div>
      </div>
    </div>
  );
}