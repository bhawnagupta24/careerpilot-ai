import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readinessService } from "@/services/readiness.service";

export function useReadiness() {
  return useQuery({
    queryKey: ["readiness"],
    queryFn: readinessService.get,
  });
}

export function useRecalculateReadiness() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => readinessService.calculate(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["readiness"] });
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
}

export function useReadinessSuggestions() {
  return useMutation({
    mutationFn: () => readinessService.getSuggestions(),
  });
}
