import api, { unwrap, type ApiEnvelope } from "./api";
import type { ReadinessScore } from "@/types";

export const readinessService = {
  get: (): Promise<{ readiness: ReadinessScore }> =>
    unwrap(api.get<ApiEnvelope<{ readiness: ReadinessScore }>>("/readiness")),

  calculate: (): Promise<{ readiness: ReadinessScore }> =>
    unwrap(api.post<ApiEnvelope<{ readiness: ReadinessScore }>>("/readiness/calculate")),

  getSuggestions: (): Promise<{ suggestions: string[] }> =>
    unwrap(api.post<ApiEnvelope<{ suggestions: string[] }>>("/readiness/suggestions")),
};
