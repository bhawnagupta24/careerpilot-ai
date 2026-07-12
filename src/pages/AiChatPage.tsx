import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageSquarePlus, Send, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChatBubble } from "@/components/dashboard/ChatBubble";
import { cn } from "@/utils/cn";
import { useChatMessages, useChatSessions, useSendMessage } from "@/hooks/useChat";
import { chatService } from "@/services/chat.service";
import { formatRelativeTime } from "@/utils/formatters";
import { getErrorMessage } from "@/utils/errorMessage";

const suggestions = [
  "Review my resume for a backend SDE role",
  "What should I focus on this week?",
  "Help me prep for a system design interview",
];

export function AiChatPage() {
  const { data: sessionsData } = useChatSessions();
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const { data: messagesData } = useChatMessages(activeSession);
  const sendMessage = useSendMessage();
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sessions = sessionsData?.sessions ?? [];
  const messages = messagesData?.messages ?? [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    setError(null);
    setInput("");
    try {
      const result = await sendMessage.mutateAsync({ sessionId: activeSession, content });
      setActiveSession(result.sessionId);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't reach the AI mentor. Please try again."));
    }
  };

  const handleNewSession = async () => {
    const { session } = await chatService.createSession();
    setActiveSession(session.id);
  };

  return (
    <div>
      <PageHeader
        title="AI Career Chat"
        description="Ask about resumes, interviews, roadmap changes — anything placement related."
        action={
          <Button variant="secondary" size="sm" onClick={handleNewSession}>
            <MessageSquarePlus className="h-3.5 w-3.5" /> New chat
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="scrollbar-thin max-h-[560px] overflow-y-auto p-3 lg:col-span-1">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-ink-500">Sessions</p>
          <div className="flex flex-col gap-1">
            {sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSession(s.id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  activeSession === s.id ? "bg-white/[0.08] text-ink-50" : "text-ink-400 hover:bg-white/[0.04] hover:text-ink-100"
                )}
              >
                <p className="truncate">{s.title}</p>
                <p className="text-[11px] text-ink-600">{formatRelativeTime(s.updatedAt)}</p>
              </button>
            ))}
            {sessions.length === 0 && <p className="px-3 py-4 text-xs text-ink-500">No conversations yet.</p>}
          </div>
        </Card>

        <Card className="flex h-[560px] flex-col p-4 lg:col-span-3">
          <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-1 py-2">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient-soft">
                  <Sparkles className="h-5 w-5 text-brand-cyan" />
                </div>
                <p className="max-w-xs text-sm text-ink-400">
                  Ask CareerPilot AI anything about your placement journey.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map((s) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleSend(s)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-300 hover:bg-white/[0.06]"
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <ChatBubble key={m.id ?? i} message={m} />
            ))}
          </div>

          {error && <p className="mt-2 text-xs text-danger">{error}</p>}

          <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Message CareerPilot AI..."
              className="input-base flex-1"
            />
            <Button size="md" onClick={() => handleSend()} isLoading={sendMessage.isPending}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
