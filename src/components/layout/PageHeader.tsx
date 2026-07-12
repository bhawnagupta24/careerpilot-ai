import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
    >
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink-50 sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-ink-400">{description}</p>}
      </div>
      {action && <div>{action}</div>}
    </motion.div>
  );
}
