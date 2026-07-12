import { Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "@/routes/ProtectedRoute";

import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { DashboardHome } from "@/pages/dashboard/DashboardHome";
import { ProfilePage } from "@/pages/ProfilePage";
import { RoadmapPage } from "@/pages/RoadmapPage";
import { TodayTasksPage } from "@/pages/TodayTasksPage";
import { WeeklyPlannerPage } from "@/pages/WeeklyPlannerPage";
import { MonthlyPlannerPage } from "@/pages/MonthlyPlannerPage";
import { PlacementReadinessPage } from "@/pages/PlacementReadinessPage";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { AchievementsPage } from "@/pages/AchievementsPage";
import { AiChatPage } from "@/pages/AiChatPage";
import { ResumeUploadPage } from "@/pages/ResumeUploadPage";
import { MockInterviewPage } from "@/pages/MockInterviewPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { ROUTES } from "@/utils/constants";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardHome />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.ROADMAP} element={<RoadmapPage />} />
          <Route path={ROUTES.TODAY_TASKS} element={<TodayTasksPage />} />
          <Route path={ROUTES.WEEKLY_PLANNER} element={<WeeklyPlannerPage />} />
          <Route path={ROUTES.MONTHLY_PLANNER} element={<MonthlyPlannerPage />} />
          <Route path={ROUTES.READINESS} element={<PlacementReadinessPage />} />
          <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
          <Route path={ROUTES.ACHIEVEMENTS} element={<AchievementsPage />} />
          <Route path={ROUTES.AI_CHAT} element={<AiChatPage />} />
          <Route path={ROUTES.RESUME} element={<ResumeUploadPage />} />
          <Route path={ROUTES.MOCK_INTERVIEW} element={<MockInterviewPage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
