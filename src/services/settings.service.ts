import api, { unwrap, type ApiEnvelope } from "./api";
import type { AccountSettings } from "@/types";

export const settingsService = {
  get: (): Promise<AccountSettings> =>
    unwrap(api.get<ApiEnvelope<AccountSettings>>("/settings")),

  update: (payload: Partial<AccountSettings>): Promise<AccountSettings> =>
    unwrap(api.put<ApiEnvelope<AccountSettings>>("/settings", payload)),

  changePassword: (currentPassword: string, newPassword: string): Promise<null> =>
    unwrap(
      api.post<ApiEnvelope<null>>("/settings/change-password", { currentPassword, newPassword })
    ),

  deleteAccount: (): Promise<null> => unwrap(api.delete<ApiEnvelope<null>>("/settings/account")),
};
