import api, { unwrap, type ApiEnvelope } from "./api";
import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types";

export const authService = {
  login: (payload: LoginPayload): Promise<AuthResponse> =>
    unwrap(api.post<ApiEnvelope<AuthResponse>>("/auth/login", payload)),

  register: (payload: RegisterPayload): Promise<AuthResponse> =>
    unwrap(api.post<ApiEnvelope<AuthResponse>>("/auth/register", payload)),

  googleLogin: (idToken: string): Promise<AuthResponse> =>
    unwrap(api.post<ApiEnvelope<AuthResponse>>("/auth/google", { idToken })),

  forgotPassword: (email: string): Promise<null> =>
    unwrap(api.post<ApiEnvelope<null>>("/auth/forgot-password", { email })),

  resetPassword: (token: string, newPassword: string): Promise<null> =>
    unwrap(api.post<ApiEnvelope<null>>("/auth/reset-password", { token, newPassword })),

  logout: (refreshToken?: string): Promise<null> =>
    unwrap(api.post<ApiEnvelope<null>>("/auth/logout", { refreshToken })),

  getCurrentUser: (): Promise<{ user: User }> =>
    unwrap(api.get<ApiEnvelope<{ user: User }>>("/auth/me")),

  refreshToken: (refreshToken: string): Promise<{ accessToken: string }> =>
    unwrap(api.post<ApiEnvelope<{ accessToken: string }>>("/auth/refresh-token", { refreshToken })),
};
