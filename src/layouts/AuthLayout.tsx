import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck, Sparkles, Target } from "lucide-react";
import { ROUTES } from "@/utils/constants";

const highlights = [
  { icon: Target, text: "Personalized AI roadmap toward your target role" },
  { icon: Sparkles, text: "Daily tasks generated from your real progress" },
  { icon: ShieldCheck, text: "Mock interviews scored like the real thing" },
];

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-base-900 p-12 lg:flex">
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-blue/20 blur-[100px] animate-aurora" />
        <div className="absolute -right-10 top-10 h-72 w-72 rounded-full bg-brand-cyan/20 blur-[100px] animate-aurora" />

        <Link to={ROUTES.HOME} className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient">
            <Rocket className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-display text-lg font-semibold">CareerPilot AI</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink-50">
            Your co-pilot for the placement season.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            Track readiness, plan every week, and walk into interviews already knowing your gaps.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <h.icon className="h-4 w-4 text-brand-cyan" />
                </div>
                <span className="text-sm text-ink-200">{h.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="relative z-10 text-xs text-ink-500">© 2026 CareerPilot AI. All rights reserved.</p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
