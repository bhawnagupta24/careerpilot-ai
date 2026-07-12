import { useQuery } from "@tanstack/react-query";
import { analyticsService, type AnalyticsRange } from "@/services/analytics.service";

export function useAnalyticsSummary(range: AnalyticsRange = "month") {
  return useQuery({
    queryKey: ["analytics", "summary", range],
    queryFn: () => analyticsService.getSummary(range),
  });
}

export function useActivityHeatmap(year: number) {
  return useQuery({
    queryKey: ["analytics", "heatmap", year],
    queryFn: () => analyticsService.getHeatmap(year),
  });
}
