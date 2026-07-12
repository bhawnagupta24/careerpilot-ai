import api, { unwrap, type ApiEnvelope } from "./api";
import type { Streak } from "@/types";

export const streakService = {
  get: (): Promise<{ streak: Streak }> =>
    unwrap(api.get<ApiEnvelope<{ streak: Streak }>>("/streak")),
};
