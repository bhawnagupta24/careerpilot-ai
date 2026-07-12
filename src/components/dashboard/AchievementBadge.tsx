import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Achievement } from "@/types";

const tierStyles = {
  bronze: "from-[#B45309] to-[#F59E0B]",
  silver: "from-[#94A3B8] to-[#E2E8F0]",
  gold: "from-[#F59E0B] to-[#FDE68A]",
  platinum: "from-brand-blue to-brand-cyan",
};

export function AchievementBadge({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn(
        "card flex flex-col items-center gap-3 p-5 text-center",
        !achievement.unlocked && "opacity-50 grayscale"
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br",
          tierStyles[achievement.tier]
        )}
      >
        {achievement.unlocked ? (
          <Award className="h-6 w-6 text-white" />
        ) : (
          <Lock className="h-5 w-5 text-white/80" />
        )}
      </div>
      <div>
        <p className="font-display text-sm font-semibold text-ink-50">{achievement.title}</p>
        <p className="mt-1 text-xs text-ink-400">{achievement.description}</p>
      </div>
      {achievement.unlocked && achievement.unlockedAt && (
        <span className="text-[10px] uppercase tracking-wide text-ink-500">
          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
        </span>
      )}
    </motion.div>
  );
}
