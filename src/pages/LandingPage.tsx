import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Map,
  Gauge,
  MessageSquare,
  FileText,
  Mic,
  LineChart,
  CheckCircle2,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/utils/constants";

const features = [
  {
    icon: Map,
    title: "AI Roadmap",
    desc: "A step-by-step path to your target role, rebuilt automatically as your skills grow.",
  },
  {
    icon: Gauge,
    title: "Readiness Score",
    desc: "One number that tells you exactly how placement-ready you are, and what's holding it back.",
  },
  {
    icon: MessageSquare,
    title: "AI Career Chat",
    desc: "Ask anything — from resume wording to negotiation scripts — and get a grounded answer.",
  },
  {
    icon: FileText,
    title: "Resume Intelligence",
    desc: "Upload once, get an ATS score, missing keywords, and line-by-line suggestions.",
  },
  {
    icon: Mic,
    title: "Mock Interviews",
    desc: "Practice with role-specific questions and get scored feedback after every session.",
  },
  {
    icon: LineChart,
    title: "Progress Analytics",
    desc: "Applications, interviews, and offers, tracked on one dashboard you'll actually check.",
  },
];

const steps = [
  { title: "Tell us your target role", desc: "Pick the role and companies you're aiming for." },
  { title: "Get your flight path", desc: "CareerPilot builds a week-by-week roadmap around your gaps." },
  { title: "Fly through daily tasks", desc: "Show up to a fresh task list every morning, planned for you." },
  { title: "Land the offer", desc: "Walk into interviews with a readiness score that's actually true." },
];

const plans = [
  {
    name: "Solo",
    price: "Free",
    desc: "For students just starting their placement prep.",
    features: ["AI Roadmap", "Daily task planner", "Basic readiness score", "3 mock interviews / month"],
  },
  {
    name: "Pilot",
    price: "₹399/mo",
    desc: "For students in active placement season.",
    features: ["Everything in Solo", "Unlimited mock interviews", "Resume ATS scoring", "Full analytics suite"],
    highlighted: true,
  },
  {
    name: "Campus",
    price: "Custom",
    desc: "For colleges and training & placement cells.",
    features: ["Everything in Pilot", "Cohort dashboards", "Placement cell analytics", "Dedicated support"],
  },
];

const faqs = [
  {
    q: "Is CareerPilot AI free to use?",
    a: "The Solo plan is free forever and covers the core roadmap, planner, and readiness score.",
  },
  {
    q: "Which roles does the AI roadmap support?",
    a: "SDE, data analyst, product, and consulting tracks today, with more roles added regularly.",
  },
  {
    q: "How is the readiness score calculated?",
    a: "It blends your task completion, mock interview scores, resume strength, and skill coverage.",
  },
  {
    q: "Can my college use this for the whole batch?",
    a: "Yes — the Campus plan gives placement cells a cohort-wide readiness dashboard.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:pt-28">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-brand-blue/20 blur-[120px] animate-aurora" />
        <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-brand-cyan/20 blur-[120px] animate-aurora" />

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-ink-300"
          >
            <Plane className="h-3.5 w-3.5 text-brand-cyan" />
            Now flying 12,000+ students to offers
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-semibold leading-[1.1] text-ink-50 sm:text-6xl"
          >
            Your AI co-pilot to
            <br />
            <span className="text-gradient">campus placement.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-base text-ink-400"
          >
            CareerPilot AI plans your roadmap, sets your daily tasks, scores your readiness,
            and runs your mock interviews — so placement season feels like a flight plan, not free fall.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>
              Start your roadmap <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate(ROUTES.LOGIN)}>
              I already have an account
            </Button>
          </motion.div>
        </div>

        {/* Dashboard preview mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="card relative mx-auto mt-16 max-w-5xl overflow-hidden p-3 sm:p-4"
        >
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-2 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          </div>
          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 sm:col-span-2">
              <p className="mb-3 text-xs text-ink-500">Placement Readiness</p>
              <div className="flex items-end gap-2">
                <span className="font-display text-4xl font-semibold text-ink-50">78%</span>
                <span className="mb-1 text-xs text-success">+6% this week</span>
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-white/[0.06]">
                <div className="h-full w-[78%] rounded-full bg-brand-gradient" />
              </div>
            </div>
            <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
              <p className="mb-3 text-xs text-ink-500">Today</p>
              <div className="space-y-2">
                {["DSA — Graphs", "Mock Interview", "Resume Review"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs text-ink-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-cyan" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan">Features</p>
            <h2 className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">
              Everything placement prep needed, in one cockpit.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient-soft">
                  <f.icon className="h-5 w-5 text-brand-cyan" />
                </div>
                <h3 className="font-display text-base font-semibold text-ink-50">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan">Flight plan</p>
            <h2 className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">Four steps to takeoff.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative"
              >
                <span className="font-display text-3xl font-semibold text-white/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-display text-base font-semibold text-ink-50">{s.title}</h4>
                <p className="mt-1.5 text-sm text-ink-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan">Pricing</p>
            <h2 className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">Simple, honest pricing.</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={
                  p.highlighted
                    ? "card relative border-brand-blue/40 p-7 shadow-glow"
                    : "card p-7"
                }
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold text-ink-50">{p.name}</h3>
                <p className="mt-1 text-sm text-ink-400">{p.desc}</p>
                <p className="mt-5 font-display text-3xl font-semibold text-ink-50">{p.price}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink-300">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-7 w-full"
                  variant={p.highlighted ? "primary" : "secondary"}
                  onClick={() => navigate(ROUTES.REGISTER)}
                >
                  Choose {p.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-cyan">FAQ</p>
            <h2 className="font-display text-3xl font-semibold text-ink-50 sm:text-4xl">Questions, answered.</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="card p-5">
                <p className="font-display text-sm font-semibold text-ink-50">{f.q}</p>
                <p className="mt-2 text-sm text-ink-400">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="card mx-auto flex max-w-4xl flex-col items-center gap-5 bg-brand-gradient-soft p-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink-50">Ready for takeoff?</h2>
          <p className="max-w-md text-sm text-ink-400">
            Build your roadmap in under two minutes and get today's tasks instantly.
          </p>
          <Button size="lg" onClick={() => navigate(ROUTES.REGISTER)}>
            Start your roadmap <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
