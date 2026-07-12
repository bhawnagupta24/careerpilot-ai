import { useState } from "react";
import { CheckCircle2, Clock3, ListTodo, XCircle } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressChart } from "@/components/charts/ProgressChart";
import { SkillsBarChart } from "@/components/charts/SkillsBarChart";
import { HeatmapCalendar } from "@/components/dashboard/HeatmapCalendar";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useAnalyticsSummary, useActivityHeatmap } from "@/hooks/useAnalytics";
import type { AnalyticsRange } from "@/services/analytics.service";

export function AnalyticsPage() {
  const [range, setRange] = useState<AnalyticsRange>("month");
  const { data: summary, isLoading } = useAnalyticsSummary(range);
  const { data: heatmapData } = useActivityHeatmap(new Date().getFullYear());

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Your study effort, task consistency, and skill growth, tracked over time."
        action={
          <Tabs
            tabs={[
              { key: "week", label: "Week" },
              { key: "month", label: "Month" },
              { key: "year", label: "Year" },
            ]}
            active={range}
            onChange={(k) => setRange(k as AnalyticsRange)}
          />
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Study hours" value={`${summary?.studyHoursTotal ?? "—"}h`} icon={Clock3} delay={0} />
        <StatCard label="Tasks completed" value={summary?.tasksCompleted ?? "—"} icon={CheckCircle2} delay={0.05} />
        <StatCard label="Tasks pending" value={summary?.tasksPending ?? "—"} icon={ListTodo} delay={0.1} />
        <StatCard label="Tasks missed" value={summary?.tasksMissed ?? "—"} icon={XCircle} delay={0.15} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Readiness over time</CardTitle>
          </CardHeader>
          {isLoading ? <CardSkeleton /> : <ProgressChart data={summary?.progressTrend ?? []} />}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill breakdown</CardTitle>
          </CardHeader>
          {isLoading ? <CardSkeleton /> : <SkillsBarChart data={summary?.skillBreakdown ?? []} />}
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activity heatmap</CardTitle>
          </CardHeader>
          <HeatmapCalendar data={heatmapData?.heatmap ?? []} weeks={26} />
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strong areas</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {summary?.strongAreas.length ? (
              summary.strongAreas.map((s) => (
                <Badge key={s} variant="success">
                  {s}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-ink-500">Not enough data yet.</p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weak areas</CardTitle>
          </CardHeader>
          <div className="flex flex-wrap gap-1.5">
            {summary?.weakAreas.length ? (
              summary.weakAreas.map((s) => (
                <Badge key={s} variant="danger">
                  {s}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-ink-500">Not enough data yet.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
