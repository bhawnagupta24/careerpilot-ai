import { useMemo, useState } from "react";
import { cn } from "@/utils/cn";
import type { HeatmapEntry } from "@/types";

interface HeatmapCalendarProps {
  data: HeatmapEntry[];
  weeks?: number;
}

function levelForCount(count: number): number {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

const levelColors = [
  "bg-white/[0.04]",
  "bg-brand-blue/25",
  "bg-brand-blue/50",
  "bg-brand-indigo/70",
  "bg-brand-cyan",
];

export function HeatmapCalendar({ data, weeks = 26 }: HeatmapCalendarProps) {
  const [hovered, setHovered] = useState<HeatmapEntry | null>(null);

  const grid = useMemo(() => {
    const map = new Map(data.map((d) => [d.date, d.count]));
    const days: HeatmapEntry[] = [];
    const today = new Date();
    const totalDays = weeks * 7;
    for (let i = totalDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      days.push({ date: key, count: map.get(key) ?? 0 });
    }
    const cols: HeatmapEntry[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }
    return cols;
  }, [data, weeks]);

  return (
    <div className="relative">
      <div className="scrollbar-thin flex gap-1 overflow-x-auto pb-2">
        {grid.map((col, i) => (
          <div key={i} className="flex flex-col gap-1">
            {col.map((day) => (
              <div
                key={day.date}
                onMouseEnter={() => setHovered(day)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "h-3 w-3 rounded-[3px] transition-transform hover:scale-125",
                  levelColors[levelForCount(day.count)]
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-ink-500">
        <span>{hovered ? `${hovered.count} activities on ${hovered.date}` : "Hover a day for details"}</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          {levelColors.map((c, i) => (
            <div key={i} className={cn("h-3 w-3 rounded-[3px]", c)} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
