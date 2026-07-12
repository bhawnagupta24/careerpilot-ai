import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, Menu, LogOut, Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-base-950/70 px-4 backdrop-blur-xl lg:px-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="rounded-lg p-2 text-ink-400 hover:bg-white/[0.06] lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 sm:flex">
          <Search className="h-4 w-4 text-ink-500" />
          <input
            placeholder="Search tasks, resources, chats..."
            className="w-56 bg-transparent text-sm text-ink-50 placeholder:text-ink-500 outline-none"
          />
        </div>
      </div>

      <div className="relative flex items-center gap-3">
        <button className="relative rounded-full p-2 text-ink-400 hover:bg-white/[0.06] hover:text-ink-50">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-cyan" />
        </button>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-white/[0.06]"
        >
          <Avatar name={user?.name ?? "Guest Student"} src={user?.avatarUrl} size="sm" />
          <div className="hidden flex-col items-start sm:flex">
            <span className="text-sm font-medium text-ink-50">{user?.name ?? "Guest Student"}</span>
            <span className="text-xs text-ink-500">{user?.targetRole ?? "Aspiring SDE"}</span>
          </div>
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 top-12 z-20 w-48 overflow-hidden rounded-xl border border-white/10 bg-base-800 shadow-card">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate(ROUTES.PROFILE);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink-200 hover:bg-white/[0.06]"
              >
                <UserIcon className="h-4 w-4" /> Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate(ROUTES.SETTINGS);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-ink-200 hover:bg-white/[0.06]"
              >
                <SettingsIcon className="h-4 w-4" /> Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 border-t border-white/[0.06] px-4 py-2.5 text-left text-sm text-danger hover:bg-danger/10"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
