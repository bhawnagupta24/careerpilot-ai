import { useQuery } from "@tanstack/react-query";
import { plannerService } from "@/services/planner.service";

export function useWeeklyPlan(weekOffset = 0) {
  return useQuery({
    queryKey: ["planner", "weekly", weekOffset],
    queryFn: () => plannerService.getWeeklyPlan(weekOffset),
  });
}

export function useMonthlyPlan(monthOffset = 0) {
  return useQuery({
    queryKey: ["planner", "monthly", monthOffset],
    queryFn: () => plannerService.getMonthlyPlan(monthOffset),
  });
}
