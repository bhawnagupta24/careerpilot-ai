import { Link } from "react-router-dom";
import { Flame, Gauge, ListChecks, Clock3, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskItem } from "@/components/dashboard/TaskItem";
import { ProgressChart } from "@/components/charts/ProgressChart";
import { HeatmapCalendar } from "@/components/dashboard/HeatmapCalendar";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTodayTasks, useCompleteTask } from "@/hooks/useTasks";
import { useReadiness } from "@/hooks/useReadiness";
import { useAnalyticsSummary, useActivityHeatmap } from "@/hooks/useAnalytics";
import { useStreak } from "@/hooks/useStreak";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/constants";

export function DashboardHome() {
  const { user } = useAuth();
  const { data: tasksData, isLoading: tasksLoading } = useTodayTasks();
  const { data: readinessData, isLoading: readinessLoading } = useReadiness();
  const { data: summary, isLoading: summaryLoading } = useAnalyticsSummary("month");
  const { data: heatmapData } = useActivityHeatmap(new Date().getFullYear());
  const { data: streakData } = useStreak();
  const completeTask = useCompleteTask();

  const tasks = tasksData?.tasks ?? [];
  const completedToday = tasks.filter((t) => t.status === "completed").length;
  const readiness = readinessData?.readiness;

  return (
    <div>
      <PageHeader
        title={`Good to see you, ${user?.name?.split(" ")[0] ?? "Pilot"}.`}
        description="Here's where your placement journey stands today."
        action={
          <Link to={ROUTES.TODAY_TASKS}>
            <Button variant="secondary" size="sm">
              View all tasks <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Readiness score"
          value={`${readiness?.overallScore ?? "—"}%`}
          icon={Gauge}
          delay={0}
        />
        <StatCard
          label="Study hours (30d)"
          value={summary ? `${summary.studyHoursTotal}h` : "—"}
          icon={Clock3}
          delay={0.05}
        />
        <StatCard
          label="Current streak"
          value={streakData ? `${streakData.streak.currentStreak}d` : "—"}
          icon={Flame}
          delay={0.1}
        />
        <StatCard
          label="Tasks completed today"
          value={`${completedToday}/${tasks.length}`}
          icon={ListChecks}
          delay={0.15}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Readiness trend</CardTitle>
            <span className="text-xs text-ink-500">Last 30 days</span>
          </CardHeader>
          {summaryLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : (
            <ProgressChart data={summary?.progressTrend ?? []} />
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall readiness</CardTitle>
          </CardHeader>
          {readinessLoading ? (
            <Skeleton className="h-40 w-full" />
          ) : (
            <>
              <p className="font-display text-4xl font-semibold text-ink-50">
                {readiness?.overallScore ?? 0}%
              </p>
              <p className="mb-4 mt-1 text-xs text-ink-400">
                {readiness ? `Updated ${new Date(readiness.createdAt).toLocaleDateString()}` : "Not calculated yet"}
              </p>
              <ProgressBar value={readiness?.overallScore ?? 0} />
              <Link to={ROUTES.READINESS}>
                <Button variant="secondary" size="sm" className="mt-5 w-full">
                  See full breakdown
                </Button>
              </Link>
            </>
          )}
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's tasks</CardTitle>
            <Link to={ROUTES.TODAY_TASKS} className="text-xs text-brand-cyan hover:underline">
              Open planner
            </Link>
          </CardHeader>
          <div className="space-y-2">
            {tasksLoading && (
              <>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </>
            )}
            {tasks.slice(0, 5).map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isUpdating={completeTask.isPending}
                onComplete={(id) => completeTask.mutate({ taskId: id })}
              />
            ))}
            {!tasksLoading && tasks.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-500">
                No tasks yet — your roadmap will populate this soon.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <HeatmapCalendar data={heatmapData?.heatmap ?? []} weeks={14} />
        </Card>
      </div>
    </div>
  );
}
