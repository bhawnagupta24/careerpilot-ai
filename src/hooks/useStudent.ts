import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@/services/student.service";
import type { StudentProfile } from "@/types";

export function useStudentProfile() {
  return useQuery({
    queryKey: ["student", "profile"],
    queryFn: studentService.getProfile,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<StudentProfile>) => studentService.updateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    },
  });
}

export function useUpdateSkills() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skills: string[]) => studentService.updateSkills(skills),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    },
  });
}

export function useUpdateTargetCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetCompany: string) => studentService.updateTargetCompany(targetCompany),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    },
  });
}

export function useUpdateStudyTime() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (studyHoursPerDay: number) => studentService.updateStudyTime(studyHoursPerDay),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", "profile"] });
    },
  });
}
