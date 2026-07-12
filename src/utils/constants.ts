export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const AUTH_TOKEN_KEY = "careerpilot_auth_token";
export const REFRESH_TOKEN_KEY = "careerpilot_refresh_token";

export const APP_NAME = "CareerPilot AI";

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/app/dashboard",
  PROFILE: "/app/profile",
  ROADMAP: "/app/roadmap",
  TODAY_TASKS: "/app/tasks",
  WEEKLY_PLANNER: "/app/planner/weekly",
  MONTHLY_PLANNER: "/app/planner/monthly",
  READINESS: "/app/readiness",
  ANALYTICS: "/app/analytics",
  ACHIEVEMENTS: "/app/achievements",
  AI_CHAT: "/app/chat",
  RESUME: "/app/resume",
  MOCK_INTERVIEW: "/app/interview",
  SETTINGS: "/app/settings",
} as const;

export const PRIORITY_COLORS: Record<string, string> = {
  high: "text-danger bg-danger/10 border-danger/30",
  medium: "text-warning bg-warning/10 border-warning/30",
  low: "text-success bg-success/10 border-success/30",
};
