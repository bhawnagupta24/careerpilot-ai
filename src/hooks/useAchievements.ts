import { useQuery } from "@tanstack/react-query";
import { achievementsService } from "@/services/achievements.service";

export function useAchievements() {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: achievementsService.list,
  });
}
