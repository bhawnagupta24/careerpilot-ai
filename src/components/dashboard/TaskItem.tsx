import { motion } from "framer-motion";
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { PRIORITY_COLORS } from "@/utils/constants";
import type { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onComplete: (id: string) => void;
  isUpdating?: boolean;
}

export function TaskItem({ task, onComplete, isUpdating }: TaskItemProps) {
  const isCompleted = task.status === "completed";
  const isMissed = task.status === "missed";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.04]"
    >
      <button
        onClick={() => !isCompleted && !isMissed && onComplete(task.id)}
        disabled={isCompleted || isMissed || isUpdating}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-default",
          isCompleted && "border-transparent bg-brand-gradient",
          isMissed && "border-danger/40 bg-danger/10",
          !isCompleted && !isMissed && "border-white/20 hover:border-brand-blue"
        )}
      >
        {isCompleted && <Check className="h-3 w-3 text-white" />}
        {isMissed && <X className="h-3 w-3 text-danger" />}
      </button>

      <div className="min-w-0 flex-1">
        <p className={cn("truncate text-sm font-medium", isCompleted ? "text-ink-500 line-through" : "text-ink-50")}>
          {task.title}
        </p>
        {task.description && <p className="truncate text-xs text-ink-500">{task.description}</p>}
      </div>

      {task.estimatedMinutes && (
        <span className="flex shrink-0 items-center gap-1 text-xs text-ink-500">
          <Clock className="h-3 w-3" />
          {task.estimatedMinutes}m
        </span>
      )}

      <span
        className={cn(
          "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide",
          PRIORITY_COLORS[task.priority]
        )}
      >
        {task.priority}
      </span>
    </motion.div>
  );
}
