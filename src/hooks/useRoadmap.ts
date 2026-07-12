import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roadmapService, type GenerateRoadmapPayload } from "@/services/roadmap.service";
import type { RoadmapNode, RoadmapNodeStatus } from "@/types";

export function useRoadmap() {
  return useQuery({
    queryKey: ["roadmap"],
    queryFn: roadmapService.getActive,
  });
}

export function useGenerateRoadmap() {
  return useMutation({
    mutationFn: (payload: GenerateRoadmapPayload = {}) => roadmapService.generate(payload),
  });
}

export function useSaveRoadmap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      title: string;
      targetRole: string;
      nodes: Omit<RoadmapNode, "id">[];
      generatedBy?: "ai" | "manual";
    }) => roadmapService.save(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}

export function useUpdateNodeStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      roadmapId,
      nodeId,
      status,
    }: {
      roadmapId: string;
      nodeId: string;
      status: RoadmapNodeStatus;
    }) => roadmapService.updateNodeStatus(roadmapId, nodeId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
    },
  });
}

export function useRegenerateRoadmap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => roadmapService.regenerate(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap"] });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
