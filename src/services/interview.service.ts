import api, { unwrap, type ApiEnvelope } from "./api";
import type { InterviewFeedback, MockInterviewSession } from "@/types";

export const interviewService = {
  start: (
    role?: string,
    difficulty: "easy" | "medium" | "hard" = "medium",
    count = 5
  ): Promise<{ session: MockInterviewSession }> =>
    unwrap(
      api.post<ApiEnvelope<{ session: MockInterviewSession }>>("/interview/start", {
        role,
        difficulty,
        count,
      })
    ),

  getSession: (sessionId: string): Promise<{ session: MockInterviewSession }> =>
    unwrap(api.get<ApiEnvelope<{ session: MockInterviewSession }>>(`/interview/${sessionId}`)),

  getHistory: (): Promise<{ sessions: MockInterviewSession[] }> =>
    unwrap(api.get<ApiEnvelope<{ sessions: MockInterviewSession[] }>>("/interview/history")),

  submitAnswer: (
    sessionId: string,
    questionId: string,
    answer: string
  ): Promise<{ feedback: InterviewFeedback; session: MockInterviewSession }> =>
    unwrap(
      api.post<ApiEnvelope<{ feedback: InterviewFeedback; session: MockInterviewSession }>>(
        `/interview/${sessionId}/answer`,
        { questionId, answer }
      )
    ),

  end: (sessionId: string): Promise<{ session: MockInterviewSession }> =>
    unwrap(api.post<ApiEnvelope<{ session: MockInterviewSession }>>(`/interview/${sessionId}/end`)),
};
