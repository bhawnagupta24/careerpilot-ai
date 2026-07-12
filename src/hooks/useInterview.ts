import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { interviewService } from "@/services/interview.service";

export function useInterviewHistory() {
  return useQuery({
    queryKey: ["interview", "history"],
    queryFn: interviewService.getHistory,
  });
}

export function useInterviewSession(sessionId: string | null) {
  return useQuery({
    queryKey: ["interview", "session", sessionId],
    queryFn: () => interviewService.getSession(sessionId as string),
    enabled: !!sessionId,
  });
}

export function useStartInterview() {
  return useMutation({
    mutationFn: ({
      role,
      difficulty,
      count,
    }: {
      role?: string;
      difficulty?: "easy" | "medium" | "hard";
      count?: number;
    }) => interviewService.start(role, difficulty, count),
  });
}

export function useSubmitAnswer() {
  return useMutation({
    mutationFn: ({
      sessionId,
      questionId,
      answer,
    }: {
      sessionId: string;
      questionId: string;
      answer: string;
    }) => interviewService.submitAnswer(sessionId, questionId, answer),
  });
}

export function useEndInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => interviewService.end(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview", "history"] });
      queryClient.invalidateQueries({ queryKey: ["readiness"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}
