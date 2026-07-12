import { tasksService } from "./tasks.service";

/**
 * Thin wrapper around tasksService for weekly/monthly planner views.
 * Kept as a separate module so planner pages/hooks have a stable,
 * purpose-specific import even though the backend serves both
 * under /tasks/weekly and /tasks/monthly.
 */
export const plannerService = {
  getWeeklyPlan: (weekOffset = 0) => tasksService.getWeekly(weekOffset),
  getMonthlyPlan: (monthOffset = 0) => tasksService.getMonthly(monthOffset),
};
