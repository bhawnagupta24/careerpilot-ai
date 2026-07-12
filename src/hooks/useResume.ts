import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resumeService } from "@/services/resume.service";

export function useLatestResumeAnalysis() {
  return useQuery({
    queryKey: ["resume", "latest"],
    queryFn: resumeService.getLatest,
  });
}

export function useResumeHistory() {
  return useQuery({
    queryKey: ["resume", "history"],
    queryFn: resumeService.getHistory,
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      targetRole,
      onProgress,
    }: {
      file: File;
      targetRole?: string;
      onProgress?: (p: number) => void;
    }) => resumeService.upload(file, targetRole, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      queryClient.invalidateQueries({ queryKey: ["readiness"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useDeleteResume() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resumeService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });
}
