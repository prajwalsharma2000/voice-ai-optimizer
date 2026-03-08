import { Outlet, NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Sparkles, FlaskConical, FileText, Settings, ChevronRight, Mic2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/optimizer", label: "Voice AI Optimizer", icon: Sparkles },
  { path: "/test-runs", label: "Test Runs", icon: FlaskConical },
  { path: "/prompt-versions", label: "Prompt Versions", icon: FileText },
  { path: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const location = useLocation();

  return (
    <aside
      data-testid="sidebar"
      className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-30"
    >
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <Mic2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-foreground tracking-tight">Voice AI</h1>
          <p className="text-[11px] text-muted-foreground leading-none">Performance Optimizer</p>
        </div>
      </div>

      <Separator />

      <nav className="flex-1 p-3 space-y-1" data-testid="sidebar-nav">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="md:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>

      <div className="p-4">
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-3">
          <p className="text-xs font-semibold text-primary">HighLevel Marketplace</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">AI-Powered Voice Agent Tools</p>
        </div>
      </div>
    </aside>
  );
}

function Header() {
  const location = useLocation();
  const currentPage = navItems.find(item => item.path === location.pathname);
  const pageTitle = currentPage?.label || "Dashboard";

  return (
    <header
      data-testid="header"
      className="h-14 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20"
    >
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">{pageTitle}</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold border border-success/20" data-testid="ai-status-badge">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          AI Ready
        </div>
      </div>
    </header>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background" data-testid="app-layout">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="relative p-6 md:p-8" data-testid="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}