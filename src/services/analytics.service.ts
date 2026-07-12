import api, { unwrap, type ApiEnvelope } from "./api";
import type { AnalyticsSummary, HeatmapEntry } from "@/types";

export type AnalyticsRange = "week" | "month" | "year";

export const analyticsService = {
  getSummary: (range: AnalyticsRange = "month"): Promise<AnalyticsSummary> =>
    unwrap(api.get<ApiEnvelope<AnalyticsSummary>>("/analytics/summary", { params: { range } })),

  getHeatmap: (year: number): Promise<{ heatmap: HeatmapEntry[] }> =>
    unwrap(api.get<ApiEnvelope<{ heatmap: HeatmapEntry[] }>>("/analytics/heatmap", { params: { year } })),

  getStudyHours: (
    range: AnalyticsRange = "week"
  ): Promise<{ studyMinutesTotal: number; studyHoursTotal: number }> =>
    unwrap(
      api.get<ApiEnvelope<{ studyMinutesTotal: number; studyHoursTotal: number }>>(
        "/analytics/study-hours",
        { params: { range } }
      )
    ),

  getTaskStats: (
    range: AnalyticsRange = "month"
  ): Promise<{ tasksCompleted: number; tasksPending: number; tasksMissed: number }> =>
    unwrap(
      api.get<ApiEnvelope<{ tasksCompleted: number; tasksPending: number; tasksMissed: number }>>(
        "/analytics/tasks",
        { params: { range } }
      )
    ),
};
