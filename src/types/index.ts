// ---------- Auth & User ----------
export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  authProvider: "local" | "google";
  avatarUrl?: string;
  college?: string;
  branch?: string;
  graduationYear?: number;
  targetRole?: string;
  targetCompany?: string;
  skills: string[];
  studyHoursPerDay: number;
  bio?: string;
  phone?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  isVerified: boolean;
  isActive: boolean;
  theme?: "dark" | "light" | "system";
  language?: string;
  notificationPreferences: NotificationPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  college?: string;
}

// ---------- Profile ----------
export type StudentProfile = User;

// ---------- Roadmap ----------
export type RoadmapNodeStatus = "completed" | "in-progress" | "locked" | "upcoming";

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  status: RoadmapNodeStatus;
  category: string;
  estimatedWeeks: number;
  order: number;
}

export interface Roadmap {
  id: string;
  title: string;
  targetRole: string;
  progressPercent: number;
  generatedBy: "ai" | "manual";
  isActive: boolean;
  nodes: RoadmapNode[];
  createdAt: string;
  updatedAt: string;
}

/** Preview shape returned by POST /roadmap/generate — not yet persisted (no id). */
export interface RoadmapPreview {
  title: string;
  nodes: Omit<RoadmapNode, "id">[];
}

// ---------- Tasks & Planner ----------
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "completed" | "missed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
  dueDate: string;
  originalDueDate?: string;
  completedAt?: string;
  missedAt?: string;
  isAutoMoved: boolean;
  estimatedMinutes?: number;
  actualMinutes?: number;
  planType: "daily" | "weekly" | "monthly";
}

export interface WeeklyPlan {
  startDate: string;
  endDate: string;
  /** Keyed by ISO date string (YYYY-MM-DD) */
  days: Record<string, Task[]>;
}

export interface MonthlyPlan {
  startDate: string;
  endDate: string;
  tasks: Task[];
}

// ---------- Streak ----------
export interface StreakActivityEntry {
  date: string;
  tasksCompleted: number;
  active: boolean;
}

export interface Streak {
  id: string;
  currentStreak: number;
  longestStreak: number;
  weeklyStreak: number;
  lastActiveDate?: string;
  lastActiveWeekStart?: string;
  consistencyScore: number;
  activityLog: StreakActivityEntry[];
}

// ---------- Readiness & Analytics ----------
export interface ReadinessMetric {
  label: string;
  score: number;
  fullMark: number;
}

export interface ReadinessScore {
  id: string;
  overallScore: number;
  metrics: ReadinessMetric[];
  suggestions: string[];
  createdAt: string;
}

export interface ProgressPoint {
  date: string;
  score: number;
}

export interface HeatmapEntry {
  date: string;
  count: number;
}

export interface SkillBreakdown {
  skill: string;
  proficiency: number;
}

export interface AnalyticsSummary {
  studyMinutesTotal: number;
  studyHoursTotal: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksMissed: number;
  progressTrend: ProgressPoint[];
  skillBreakdown: SkillBreakdown[];
  weakAreas: string[];
  strongAreas: string[];
}

// ---------- Achievements ----------
export type AchievementTier = "bronze" | "silver" | "gold" | "platinum";

export interface Achievement {
  id?: string;
  badgeKey: string;
  title: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AchievementsResponse {
  unlocked: Achievement[];
  locked: Achievement[];
  totalUnlocked: number;
  totalAvailable: number;
}

// ---------- AI Chat ----------
export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  id?: string;
  role: ChatRole;
  content: string;
  createdAt?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// ---------- Resume ----------
export type ResumeAnalysisStatus = "pending" | "processing" | "completed" | "failed";

export interface ResumeAnalysis {
  id: string;
  fileName: string;
  fileUrl: string;
  atsScore: number;
  suggestions: string[];
  strengths: string[];
  matchedKeywords: string[];
  missingSkills: string[];
  targetRole?: string;
  analysisStatus: ResumeAnalysisStatus;
  createdAt: string;
}

// ---------- Mock Interview ----------
export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  answer?: string;
  answeredAt?: string;
}

export interface InterviewFeedback {
  questionId: string;
  score: number;
  strengths: string[];
  improvements: string[];
}

export interface MockInterviewSession {
  id: string;
  role: string;
  startedAt: string;
  completedAt?: string;
  status: "in-progress" | "completed";
  questions: InterviewQuestion[];
  feedback: InterviewFeedback[];
  overallScore?: number;
  overallSummary?: string;
}

// ---------- Settings ----------
export interface NotificationPreferences {
  emailReminders: boolean;
  taskDeadlines: boolean;
  weeklyDigest: boolean;
  aiSuggestions: boolean;
}

export interface AccountSettings {
  theme: "dark" | "light" | "system";
  language: string;
  notifications: NotificationPreferences;
}

// ---------- Notifications ----------
export type NotificationType =
  | "daily_reminder"
  | "missed_task"
  | "weekly_report"
  | "achievement"
  | "readiness_update"
  | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// ---------- Generic API ----------
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
