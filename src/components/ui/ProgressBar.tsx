import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { clampPercent } from "@/utils/formatters";

interface ProgressBarProps {
  value: number;
  className?: string;
  trackClassName?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className, trackClassName, showLabel }: ProgressBarProps) {
  const pct = clampPercent(value);
  return (
    <div className="w-full">
      <div className={cn("h-2 w-full overflow-hidden rounded-full bg-white/[0.06]", trackClassName)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-brand-gradient", className)}
        />
      </div>
      {showLabel && <p className="mt-1 text-xs text-ink-400">{pct}% complete</p>}
    </div>
  );
}
