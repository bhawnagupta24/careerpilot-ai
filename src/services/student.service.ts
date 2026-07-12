import api, { unwrap, type ApiEnvelope } from "./api";
import type { StudentProfile } from "@/types";

export const studentService = {
  getProfile: (): Promise<{ user: StudentProfile }> =>
    unwrap(api.get<ApiEnvelope<{ user: StudentProfile }>>("/users/profile")),

  updateProfile: (payload: Partial<StudentProfile>): Promise<{ user: StudentProfile }> =>
    unwrap(api.put<ApiEnvelope<{ user: StudentProfile }>>("/users/profile", payload)),

  updateSkills: (skills: string[]): Promise<{ skills: string[] }> =>
    unwrap(api.patch<ApiEnvelope<{ skills: string[] }>>("/users/profile/skills", { skills })),

  updateTargetCompany: (targetCompany: string): Promise<{ targetCompany: string }> =>
    unwrap(
      api.patch<ApiEnvelope<{ targetCompany: string }>>("/users/profile/target-company", {
        targetCompany,
      })
    ),

  updateStudyTime: (studyHoursPerDay: number): Promise<{ studyHoursPerDay: number }> =>
    unwrap(
      api.patch<ApiEnvelope<{ studyHoursPerDay: number }>>("/users/profile/study-time", {
        studyHoursPerDay,
      })
    ),

  deleteAccount: (userId: string): Promise<null> =>
    unwrap(api.delete<ApiEnvelope<null>>(`/users/${userId}`)),
};
