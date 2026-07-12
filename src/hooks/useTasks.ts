import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { tasksService, type TaskListParams } from "@/services/tasks.service";
import type { Task } from "@/types";

export function useTodayTasks() {
  return useQuery({
    queryKey: ["tasks", "today"],
    queryFn: tasksService.getToday,
  });
}

export function useTaskList(params: TaskListParams = {}) {
  return useQuery({
    queryKey: ["tasks", "list", params],
    queryFn: () => tasksService.list(params),
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, actualMinutes }: { taskId: string; actualMinutes?: number }) =>
      tasksService.complete(taskId, actualMinutes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useMissTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => tasksService.miss(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) => tasksService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: Partial<Task> }) =>
      tasksService.update(taskId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskId: string) => tasksService.remove(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useRegenerationCheck() {
  return useQuery({
    queryKey: ["tasks", "regeneration-check"],
    queryFn: tasksService.checkRegenerationNeeded,
  });
}
