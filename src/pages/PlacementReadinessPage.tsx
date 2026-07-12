import { useState } from "react";
import { RefreshCw, Sparkles, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { ReadinessRadar } from "@/components/charts/ReadinessRadar";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useReadiness, useRecalculateReadiness, useReadinessSuggestions } from "@/hooks/useReadiness";
import { formatRelativeTime } from "@/utils/formatters";
import { getErrorMessage } from "@/utils/errorMessage";

export function PlacementReadinessPage() {
  const { data, isLoading } = useReadiness();
  const recalculate = useRecalculateReadiness();
  const generateSuggestions = useReadinessSuggestions();
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);

  const readiness = data?.readiness;

  const handleGenerateSuggestions = async () => {
    setError(null);
    try {
      const res = await generateSuggestions.mutateAsync();
      setSuggestions(res.suggestions);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't generate suggestions right now."));
    }
  };

  return (
    <div>
      <PageHeader
        title="Placement readiness"
        description="A live score blending your tasks, mock interviews, resume, and skill coverage."
        action={
          <Button
            variant="secondary"
            size="sm"
            isLoading={recalculate.isPending}
            onClick={() => recalculate.mutate()}
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh score
          </Button>
        }
      />

      {error && (
        <div className="mb-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {isLoading ? (
        <CardSkeleton />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xs uppercase tracking-wider text-ink-500">Overall score</p>
            <p className="mt-2 font-display text-6xl font-semibold text-gradient">
              {readiness?.overallScore ?? 0}%
            </p>
            <p className="mt-2 text-xs text-ink-500">
              {readiness ? `Last updated ${formatRelativeTime(readiness.createdAt)}` : "Not calculated yet"}
            </p>
            <div className="mt-6 w-full">
              <ProgressBar value={readiness?.overallScore ?? 0} />
            </div>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Score breakdown</CardTitle>
            </CardHeader>
            <ReadinessRadar data={readiness?.metrics ?? []} />
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Metric details</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {readiness?.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium text-ink-200">{m.label}</p>
                    <span className="text-sm font-semibold text-ink-50">{m.score}</span>
                  </div>
                  <ProgressBar value={(m.score / m.fullMark) * 100} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>AI improvement suggestions</CardTitle>
              <Button
                variant="secondary"
                size="sm"
                isLoading={generateSuggestions.isPending}
                onClick={handleGenerateSuggestions}
              >
                <Sparkles className="h-3.5 w-3.5" /> Generate suggestions
              </Button>
            </CardHeader>
            <div className="space-y-2">
              {(suggestions ?? readiness?.suggestions ?? []).map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3.5 text-sm text-ink-200"
                >
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" />
                  {s}
                </div>
              ))}
              {(suggestions ?? readiness?.suggestions ?? []).length === 0 && (
                <p className="py-6 text-center text-sm text-ink-500">
                  Generate suggestions to get specific, prioritized next steps.
                </p>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
