import api, { unwrap, type ApiEnvelope } from "./api";
import type { ChatMessage, ChatSession } from "@/types";

export const chatService = {
  getSessions: (): Promise<{ sessions: ChatSession[] }> =>
    unwrap(api.get<ApiEnvelope<{ sessions: ChatSession[] }>>("/chat/sessions")),

  createSession: (): Promise<{ session: ChatSession }> =>
    unwrap(api.post<ApiEnvelope<{ session: ChatSession }>>("/chat/sessions")),

  getMessages: (sessionId: string): Promise<{ messages: ChatMessage[] }> =>
    unwrap(api.get<ApiEnvelope<{ messages: ChatMessage[] }>>(`/chat/sessions/${sessionId}/messages`)),

  sendMessage: (
    sessionId: string | null,
    content: string
  ): Promise<{ message: ChatMessage; sessionId: string }> =>
    unwrap(
      api.post<ApiEnvelope<{ message: ChatMessage; sessionId: string }>>("/chat/messages", {
        sessionId,
        content,
      })
    ),

  deleteSession: (sessionId: string): Promise<null> =>
    unwrap(api.delete<ApiEnvelope<null>>(`/chat/sessions/${sessionId}`)),
};
