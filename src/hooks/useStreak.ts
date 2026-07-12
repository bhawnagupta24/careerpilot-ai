import { useQuery } from "@tanstack/react-query";
import { streakService } from "@/services/streak.service";

export function useStreak() {
  return useQuery({
    queryKey: ["streak"],
    queryFn: streakService.get,
  });
}
