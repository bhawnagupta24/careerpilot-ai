import api, { unwrap, type ApiEnvelope } from "./api";
import type { AchievementsResponse } from "@/types";

export const achievementsService = {
  list: (): Promise<AchievementsResponse> =>
    unwrap(api.get<ApiEnvelope<AchievementsResponse>>("/achievements")),
};
