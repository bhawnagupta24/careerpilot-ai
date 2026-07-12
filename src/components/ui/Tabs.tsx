import { cn } from "@/utils/cn";

interface TabsProps {
  tabs: { key: string; label: string }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={cn(
            "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            active === tab.key ? "bg-brand-gradient text-white shadow-glow" : "text-ink-400 hover:text-ink-50"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
