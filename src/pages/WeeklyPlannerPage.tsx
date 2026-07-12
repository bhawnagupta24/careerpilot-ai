import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { PRIORITY_COLORS } from "@/utils/constants";
import { cn } from "@/utils/cn";
import { useWeeklyPlan } from "@/hooks/usePlanner";

export function WeeklyPlannerPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const { data: plan, isLoading } = useWeeklyPlan(weekOffset);

  const orderedDays = useMemo(() => {
    if (!plan) return [];
    const start = new Date(plan.startDate);
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      return {
        date: key,
        dayLabel: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNumber: d.getDate(),
        tasks: plan.days[key] ?? [],
      };
    });
  }, [plan]);

  const weekLabel = plan
    ? `${new Date(plan.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${new Date(
        plan.endDate
      ).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
    : "Plan the week ahead, day by day.";

  return (
    <div>
      <PageHeader
        title="Weekly planner"
        description={weekLabel}
        action={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setWeekOffset((w) => w - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setWeekOffset(0)}>
              This week
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setWeekOffset((w) => w + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {orderedDays.map((day) => (
            <Card key={day.date} className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-display text-sm font-semibold text-ink-50">{day.dayLabel}</p>
                <span className="text-xs text-ink-500">{day.dayNumber}</span>
              </div>
              <div className="space-y-2">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "rounded-lg border px-2.5 py-2 text-xs",
                      task.status === "completed"
                        ? "border-white/[0.04] bg-white/[0.02] text-ink-500 line-through"
                        : task.status === "missed"
                          ? "border-danger/20 bg-danger/[0.04] text-ink-500"
                          : "border-white/[0.06] bg-white/[0.03] text-ink-200"
                    )}
                  >
                    <p className="line-clamp-2">{task.title}</p>
                    <Badge variant="default" className={cn("mt-1.5", PRIORITY_COLORS[task.priority])}>
                      {task.priority}
                    </Badge>
                  </div>
                ))}
                {day.tasks.length === 0 && <p className="text-xs text-ink-600">No tasks</p>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
