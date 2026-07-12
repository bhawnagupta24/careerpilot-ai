import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { ReadinessMetric } from "@/types";

export function ReadinessRadar({ data }: { data: ReadinessMetric[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data} outerRadius="75%">
        <PolarGrid stroke="rgba(255,255,255,0.08)" />
        <PolarAngleAxis dataKey="label" tick={{ fill: "#8B90A0", fontSize: 11 }} />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fill: "#6C7180", fontSize: 10 }}
          axisLine={false}
        />
        <Radar
          dataKey="score"
          stroke="#06B6D4"
          fill="#2563EB"
          fillOpacity={0.35}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
