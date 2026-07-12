import { Link, Outlet, useNavigate } from "react-router-dom";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/utils/constants";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-950">
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-base-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
              <Rocket className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-base font-semibold">CareerPilot AI</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-ink-400 transition-colors hover:text-ink-50">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
              Log in
            </Button>
            <Button size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
              Get started
            </Button>
          </div>

          <button onClick={() => setOpen(!open)} className="p-2 text-ink-400 md:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-1 border-t border-white/[0.06] px-6 py-4 md:hidden">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="rounded-lg px-2 py-2 text-sm text-ink-300" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => navigate(ROUTES.LOGIN)}>
                Log in
              </Button>
              <Button size="sm" className="flex-1" onClick={() => navigate(ROUTES.REGISTER)}>
                Get started
              </Button>
            </div>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-gradient">
              <Rocket className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm text-ink-400">© 2026 CareerPilot AI. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-ink-500">
            <a href="#" className="hover:text-ink-200">Privacy</a>
            <a href="#" className="hover:text-ink-200">Terms</a>
            <a href="#" className="hover:text-ink-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
