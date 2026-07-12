import api, { unwrap, type ApiEnvelope } from "./api";
import type { Roadmap, RoadmapNode, RoadmapNodeStatus, RoadmapPreview } from "@/types";

export interface GenerateRoadmapPayload {
  targetRole?: string;
  skills?: string[];
  graduationYear?: number;
  currentLevel?: "beginner" | "intermediate" | "advanced";
}

export const roadmapService = {
  /** Calls Gemini to draft a roadmap — does not persist it. */
  generate: (payload: GenerateRoadmapPayload = {}): Promise<{ roadmap: RoadmapPreview }> =>
    unwrap(api.post<ApiEnvelope<{ roadmap: RoadmapPreview }>>("/roadmap/generate", payload)),

  /** Persists a generated (or manually built) roadmap. */
  save: (payload: {
    title: string;
    targetRole: string;
    nodes: Omit<RoadmapNode, "id">[];
    generatedBy?: "ai" | "manual";
  }): Promise<{ roadmap: Roadmap }> =>
    unwrap(api.post<ApiEnvelope<{ roadmap: Roadmap }>>("/roadmap", payload)),

  getActive: (): Promise<{ roadmap: Roadmap | null }> =>
    unwrap(api.get<ApiEnvelope<{ roadmap: Roadmap | null }>>("/roadmap")),

  getById: (id: string): Promise<{ roadmap: Roadmap }> =>
    unwrap(api.get<ApiEnvelope<{ roadmap: Roadmap }>>(`/roadmap/${id}`)),

  update: (
    id: string,
    payload: { title?: string; nodes?: Omit<RoadmapNode, "id">[] }
  ): Promise<{ roadmap: Roadmap }> =>
    unwrap(api.put<ApiEnvelope<{ roadmap: Roadmap }>>(`/roadmap/${id}`, payload)),

  updateNodeStatus: (
    roadmapId: string,
    nodeId: string,
    status: RoadmapNodeStatus
  ): Promise<{ roadmap: Roadmap }> =>
    unwrap(
      api.patch<ApiEnvelope<{ roadmap: Roadmap }>>(`/roadmap/${roadmapId}/nodes/${nodeId}`, {
        status,
      })
    ),

  remove: (id: string): Promise<null> => unwrap(api.delete<ApiEnvelope<null>>(`/roadmap/${id}`)),

  regenerate: (): Promise<{ roadmap: Roadmap }> =>
    unwrap(api.post<ApiEnvelope<{ roadmap: Roadmap }>>("/roadmap/regenerate")),
};
