import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Map,
  ListChecks,
  CalendarDays,
  CalendarRange,
  Gauge,
  LineChart,
  Trophy,
  MessageSquare,
  FileText,
  Mic,
  Settings,
  Rocket,
} from "lucide-react";
import { ROUTES } from "@/utils/constants";
import { cn } from "@/utils/cn";

const navGroups = [
  {
    label: "Overview",
    items: [
      { to: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
      { to: ROUTES.PROFILE, label: "Profile", icon: User },
    ],
  },
  {
    label: "Plan",
    items: [
      { to: ROUTES.ROADMAP, label: "Roadmap", icon: Map },
      { to: ROUTES.TODAY_TASKS, label: "Today's Tasks", icon: ListChecks },
      { to: ROUTES.WEEKLY_PLANNER, label: "Weekly Planner", icon: CalendarDays },
      { to: ROUTES.MONTHLY_PLANNER, label: "Monthly Planner", icon: CalendarRange },
    ],
  },
  {
    label: "Grow",
    items: [
      { to: ROUTES.READINESS, label: "Readiness", icon: Gauge },
      { to: ROUTES.ANALYTICS, label: "Analytics", icon: LineChart },
      { to: ROUTES.ACHIEVEMENTS, label: "Achievements", icon: Trophy },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { to: ROUTES.AI_CHAT, label: "AI Chat", icon: MessageSquare },
      { to: ROUTES.RESUME, label: "Resume", icon: FileText },
      { to: ROUTES.MOCK_INTERVIEW, label: "Mock Interview", icon: Mic },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="scrollbar-thin hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-white/[0.06] bg-base-900/60 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
          <Rocket className="h-4 w-4 text-white" />
        </div>
        <span className="font-display text-base font-semibold tracking-tight">CareerPilot</span>
      </div>

      <nav className="flex flex-1 flex-col gap-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-ink-500">
              {group.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-ink-400 transition-colors",
                      isActive
                        ? "bg-white/[0.06] text-ink-50"
                        : "hover:bg-white/[0.04] hover:text-ink-50"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isActive ? "text-brand-cyan" : "text-ink-500 group-hover:text-ink-200"
                        )}
                      />
                      {item.label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto">
        <NavLink
          to={ROUTES.SETTINGS}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-ink-400 transition-colors",
              isActive ? "bg-white/[0.06] text-ink-50" : "hover:bg-white/[0.04] hover:text-ink-50"
            )
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
