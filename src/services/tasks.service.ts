import api, { unwrap, type ApiEnvelope } from "./api";
import type { PaginatedResult, Task, WeeklyPlan, MonthlyPlan } from "@/types";

export interface TaskListParams {
  page?: number;
  limit?: number;
  status?: Task["status"];
  priority?: Task["priority"];
  category?: string;
  search?: string;
  sort?: string;
}

export const tasksService = {
  list: (params: TaskListParams = {}): Promise<PaginatedResult<Task>> =>
    unwrap(api.get<ApiEnvelope<PaginatedResult<Task>>>("/tasks", { params })),

  getToday: (): Promise<{ tasks: Task[] }> =>
    unwrap(api.get<ApiEnvelope<{ tasks: Task[] }>>("/tasks/today")),

  getWeekly: (weekOffset = 0): Promise<WeeklyPlan> =>
    unwrap(api.get<ApiEnvelope<WeeklyPlan>>("/tasks/weekly", { params: { weekOffset } })),

  getMonthly: (monthOffset = 0): Promise<MonthlyPlan> =>
    unwrap(api.get<ApiEnvelope<MonthlyPlan>>("/tasks/monthly", { params: { monthOffset } })),

  create: (payload: Partial<Task>): Promise<{ task: Task }> =>
    unwrap(api.post<ApiEnvelope<{ task: Task }>>("/tasks", payload)),

  update: (taskId: string, payload: Partial<Task>): Promise<{ task: Task }> =>
    unwrap(api.put<ApiEnvelope<{ task: Task }>>(`/tasks/${taskId}`, payload)),

  complete: (taskId: string, actualMinutes?: number): Promise<{ task: Task }> =>
    unwrap(
      api.patch<ApiEnvelope<{ task: Task }>>(`/tasks/${taskId}/complete`, { actualMinutes })
    ),

  miss: (taskId: string): Promise<{ task: Task }> =>
    unwrap(api.patch<ApiEnvelope<{ task: Task }>>(`/tasks/${taskId}/miss`)),

  remove: (taskId: string): Promise<null> =>
    unwrap(api.delete<ApiEnvelope<null>>(`/tasks/${taskId}`)),

  moveMissedNow: (): Promise<{ missedCount: number; movedCount: number }> =>
    unwrap(api.post<ApiEnvelope<{ missedCount: number; movedCount: number }>>("/tasks/move-missed")),

  checkRegenerationNeeded: (): Promise<{ shouldRegenerate: boolean }> =>
    unwrap(
      api.get<ApiEnvelope<{ shouldRegenerate: boolean }>>("/tasks/regeneration-check")
    ),
};
