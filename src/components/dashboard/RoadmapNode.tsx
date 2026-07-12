import { motion } from "framer-motion";
import { Check, Lock, Plane, Circle } from "lucide-react";
import { cn } from "@/utils/cn";
import type { RoadmapNode as RoadmapNodeType } from "@/types";

const statusStyles = {
  completed: "bg-brand-gradient border-transparent",
  "in-progress": "bg-base-800 border-brand-cyan ring-4 ring-brand-cyan/15",
  upcoming: "bg-base-800 border-white/15",
  locked: "bg-base-850 border-white/[0.06]",
};

export function RoadmapNode({
  node,
  index,
  onClick,
}: {
  node: RoadmapNodeType;
  index: number;
  onClick?: () => void;
}) {
  const isCompleted = node.status === "completed";
  const isActive = node.status === "in-progress";
  const isLocked = node.status === "locked";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex gap-5"
    >
      <div className="flex flex-col items-center">
        <button
          onClick={onClick}
          disabled={isLocked}
          className={cn(
            "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 transition-transform",
            statusStyles[node.status],
            !isLocked && "hover:scale-105"
          )}
        >
          {isCompleted && <Check className="h-4.5 w-4.5 text-white" />}
          {isActive && <Plane className="h-4 w-4 rotate-45 text-brand-cyan" />}
          {node.status === "upcoming" && <Circle className="h-3 w-3 text-ink-500" />}
          {isLocked && <Lock className="h-3.5 w-3.5 text-ink-500" />}
          {isActive && (
            <span className="absolute inset-0 rounded-full border-2 border-brand-cyan animate-pulse-ring" />
          )}
        </button>
        <div className="my-1 h-full w-px flex-1 border-l border-dashed border-white/10" />
      </div>

      <div className={cn("flex-1 pb-8", isLocked && "opacity-50")}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
            {node.category}
          </span>
          <span className="text-[11px] text-ink-500">· {node.estimatedWeeks}w</span>
        </div>
        <h4 className="mt-1 font-display text-base font-semibold text-ink-50">{node.title}</h4>
        <p className="mt-1 text-sm text-ink-400">{node.description}</p>
      </div>
    </motion.div>
  );
}
