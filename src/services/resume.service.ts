import api, { unwrap, type ApiEnvelope } from "./api";
import type { ResumeAnalysis } from "@/types";

export const resumeService = {
  upload: (
    file: File,
    targetRole?: string,
    onProgress?: (percent: number) => void
  ): Promise<{ resume: ResumeAnalysis }> => {
    const formData = new FormData();
    formData.append("resume", file);
    if (targetRole) formData.append("targetRole", targetRole);

    return unwrap(
      api.post<ApiEnvelope<{ resume: ResumeAnalysis }>>("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (onProgress && evt.total) {
            onProgress(Math.round((evt.loaded / evt.total) * 100));
          }
        },
      })
    );
  },

  getLatest: (): Promise<{ resume: ResumeAnalysis | null }> =>
    unwrap(api.get<ApiEnvelope<{ resume: ResumeAnalysis | null }>>("/resume/latest")),

  getHistory: (): Promise<{ resumes: ResumeAnalysis[] }> =>
    unwrap(api.get<ApiEnvelope<{ resumes: ResumeAnalysis[] }>>("/resume/history")),

  remove: (id: string): Promise<null> => unwrap(api.delete<ApiEnvelope<null>>(`/resume/${id}`)),
};
