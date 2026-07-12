import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { RoadmapNode } from "@/components/dashboard/RoadmapNode";
import { CardSkeleton } from "@/components/ui/Skeleton";
import {
  useRoadmap,
  useUpdateNodeStatus,
  useGenerateRoadmap,
  useSaveRoadmap,
  useRegenerateRoadmap,
} from "@/hooks/useRoadmap";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/errorMessage";

export function RoadmapPage() {
  const { user } = useAuth();
  const { data, isLoading } = useRoadmap();
  const updateStatus = useUpdateNodeStatus();
  const generateRoadmap = useGenerateRoadmap();
  const saveRoadmap = useSaveRoadmap();
  const regenerateRoadmap = useRegenerateRoadmap();
  const [error, setError] = useState<string | null>(null);

  const roadmap = data?.roadmap ?? null;
  const isBusy = generateRoadmap.isPending || saveRoadmap.isPending || regenerateRoadmap.isPending;

  const handleGenerate = async () => {
    setError(null);
    try {
      const { roadmap: preview } = await generateRoadmap.mutateAsync({
        targetRole: user?.targetRole,
        skills: user?.skills,
        graduationYear: user?.graduationYear,
      });
      await saveRoadmap.mutateAsync({
        title: preview.title,
        targetRole: user?.targetRole || "Software Engineer",
        nodes: preview.nodes,
        generatedBy: "ai",
      });
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't generate a roadmap right now. Please try again."));
    }
  };

  const handleRegenerate = async () => {
    setError(null);
    try {
      await regenerateRoadmap.mutateAsync();
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't regenerate your roadmap. Please try again."));
    }
  };

  return (
    <div>
      <PageHeader
        title="Your roadmap"
        description="A flight plan built from your target role, current skills, and timeline."
        action={
          roadmap && (
            <Button variant="secondary" size="sm" onClick={handleRegenerate} disabled={isBusy}>
              {regenerateRoadmap.isPending ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5" />
              )}
              Regenerate with AI
            </Button>
          )
        }
      />

      {error && (
        <div className="mb-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {isLoading ? (
        <CardSkeleton />
      ) : !roadmap ? (
        <Card className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient-soft">
            <Sparkles className="h-6 w-6 text-brand-cyan" />
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-ink-50">No roadmap yet</h3>
            <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">
              Generate a personalized, AI-built placement roadmap based on your target role and skills.
            </p>
          </div>
          <Button onClick={handleGenerate} isLoading={isBusy}>
            <Sparkles className="h-4 w-4" /> Generate my roadmap
          </Button>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{roadmap.title}</CardTitle>
              <span className="text-xs text-ink-500">Target: {roadmap.targetRole}</span>
            </CardHeader>
            <ProgressBar value={roadmap.progressPercent} showLabel />
          </Card>

          <Card>
            <div className="flex flex-col">
              {[...roadmap.nodes]
                .sort((a, b) => a.order - b.order)
                .map((node, i) => (
                  <RoadmapNode
                    key={node.id}
                    node={node}
                    index={i}
                    onClick={() => {
                      if (node.status === "upcoming") {
                        updateStatus.mutate({ roadmapId: roadmap.id, nodeId: node.id, status: "in-progress" });
                      } else if (node.status === "in-progress") {
                        updateStatus.mutate({ roadmapId: roadmap.id, nodeId: node.id, status: "completed" });
                      }
                    }}
                  />
                ))}
              {roadmap.nodes.length === 0 && (
                <p className="py-10 text-center text-sm text-ink-500">
                  This roadmap has no steps yet.
                </p>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
