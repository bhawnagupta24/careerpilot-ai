import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HeatmapCalendar } from "@/components/dashboard/HeatmapCalendar";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { PRIORITY_COLORS } from "@/utils/constants";
import { cn } from "@/utils/cn";
import { useMonthlyPlan } from "@/hooks/usePlanner";
import { useActivityHeatmap } from "@/hooks/useAnalytics";

export function MonthlyPlannerPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const { data: plan, isLoading } = useMonthlyPlan(monthOffset);
  const { data: heatmapData } = useActivityHeatmap(new Date().getFullYear());

  const monthLabel = plan
    ? new Date(plan.startDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Track the bigger picture behind your daily tasks.";

  const tasksByDay = useMemo(() => {
    if (!plan) return new Map<string, typeof plan.tasks>();
    const map = new Map<string, typeof plan.tasks>();
    plan.tasks.forEach((task) => {
      const key = task.dueDate.slice(0, 10);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(task);
    });
    return map;
  }, [plan]);

  const sortedDays = useMemo(() => Array.from(tasksByDay.keys()).sort(), [tasksByDay]);

  return (
    <div>
      <PageHeader
        title="Monthly planner"
        description={monthLabel}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setMonthOffset((m) => m - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setMonthOffset(0)}>
              This month
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setMonthOffset((m) => m + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tasks this month</CardTitle>
            <span className="text-xs text-ink-500">{plan?.tasks.length ?? 0} total</span>
          </CardHeader>
          {isLoading ? (
            <CardSkeleton />
          ) : (
            <div className="max-h-[480px] space-y-4 overflow-y-auto scrollbar-thin pr-1">
              {sortedDays.map((day) => (
                <div key={day}>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink-500">
                    {new Date(day).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="space-y-2">
                    {tasksByDay.get(day)!.map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm",
                          task.status === "completed"
                            ? "border-white/[0.04] bg-white/[0.02] text-ink-500 line-through"
                            : task.status === "missed"
                              ? "border-danger/20 bg-danger/[0.04] text-ink-400"
                              : "border-white/[0.06] bg-white/[0.03] text-ink-200"
                        )}
                      >
                        <span className="truncate">{task.title}</span>
                        <Badge variant="default" className={cn("ml-3 shrink-0", PRIORITY_COLORS[task.priority])}>
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {sortedDays.length === 0 && (
                <p className="py-8 text-center text-sm text-ink-500">No tasks scheduled this month yet.</p>
              )}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly activity</CardTitle>
          </CardHeader>
          <HeatmapCalendar data={heatmapData?.heatmap ?? []} weeks={5} />
        </Card>
      </div>
    </div>
  );
}
