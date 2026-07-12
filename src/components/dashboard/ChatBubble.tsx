import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/utils/cn";
import type { ChatMessage } from "@/types";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-white/[0.08]" : "bg-brand-gradient"
        )}
      >
        {isUser ? <User className="h-4 w-4 text-ink-200" /> : <Bot className="h-4 w-4 text-white" />}
      </div>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-brand-gradient text-white"
            : "rounded-tl-sm border border-white/[0.06] bg-white/[0.03] text-ink-100"
        )}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
