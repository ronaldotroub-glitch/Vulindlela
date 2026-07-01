import { Link } from "@tanstack/react-router";

export function Brand({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "size-10" : size === "sm" ? "size-7" : "size-8";
  const t = size === "lg" ? "text-xl" : "text-base";
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${s} rounded-xl flex items-center justify-center shadow-lg`} style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}>
        <svg viewBox="0 0 24 24" fill="none" className="size-1/2 text-white">
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 22V12M4 7l8 5 8-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>
      <span className={`font-bold tracking-tight ${t} text-foreground`}>Vulindlela<span className="text-primary"> AI</span></span>
    </Link>
  );
}