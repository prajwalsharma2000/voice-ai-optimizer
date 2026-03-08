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
      className="fixed left-0 top-0 h-screen w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 flex flex-col z-30"
    >
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Mic2 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-sm font-bold text-white tracking-tight">Voice AI</h1>
          <p className="text-[11px] text-gray-400 leading-none">Performance Optimizer</p>
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
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-blue-400" : ""}`} />
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
        <div className="rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-3">
          <p className="text-xs font-semibold text-white">HighLevel Marketplace</p>
          <p className="text-[11px] text-gray-400 mt-0.5">AI-Powered Voice Agent Tools</p>
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
      className="h-14 border-b border-white/10 bg-slate-900/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20"
    >
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-white">{pageTitle}</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold border border-green-500/20" data-testid="ai-status-badge">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          AI Ready
        </div>
      </div>
    </header>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" data-testid="app-layout">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
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