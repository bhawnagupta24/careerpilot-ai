import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Bell, CheckCircle2, KeyRound, Palette, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useSettings, useUpdateSettings, useChangePassword, useDeleteAccount } from "@/hooks/useSettings";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils/errorMessage";
import { ROUTES } from "@/utils/constants";
import type { AccountSettings } from "@/types";

const tabs = [
  { key: "account", label: "Account" },
  { key: "notifications", label: "Notifications" },
  { key: "security", label: "Security" },
];

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.05] py-4 last:border-0">
      <div>
        <p className="text-sm font-medium text-ink-100">{label}</p>
        <p className="text-xs text-ink-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-brand-gradient" : "bg-white/10"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export function SettingsPage() {
  const [tab, setTab] = useState("account");
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const changePassword = useChangePassword();
  const deleteAccount = useDeleteAccount();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const {
    register: registerPw,
    handleSubmit: handlePwSubmit,
    reset: resetPwForm,
  } = useForm<{ current: string; next: string }>();

  const [localSettings, setLocalSettings] = useState<AccountSettings | null>(null);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    if (settings) setLocalSettings(settings);
  }, [settings]);

  const onChangePassword = handlePwSubmit(async (values) => {
    setPwMessage(null);
    try {
      await changePassword.mutateAsync({ currentPassword: values.current, newPassword: values.next });
      setPwMessage({ type: "success", text: "Password updated successfully." });
      resetPwForm();
    } catch (err) {
      setPwMessage({ type: "error", text: getErrorMessage(err, "Couldn't update your password.") });
    }
  });

  const handleDeleteAccount = async () => {
    if (!window.confirm("This permanently deletes your account and all data. Continue?")) return;
    setDeleteError(null);
    try {
      await deleteAccount.mutateAsync();
      logout();
      navigate(ROUTES.HOME);
    } catch (err) {
      setDeleteError(getErrorMessage(err, "Couldn't delete your account. Please try again."));
    }
  };

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account, notifications, and security." action={<Tabs tabs={tabs} active={tab} onChange={setTab} />} />

      {isLoading || !localSettings ? (
        <CardSkeleton />
      ) : (
        <div className="mx-auto max-w-2xl">
          {tab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle><Palette className="mr-2 inline h-4 w-4 text-brand-cyan" />Appearance & language</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <div>
                  <label className="label-base">Theme</label>
                  <select
                    className="input-base"
                    value={localSettings.theme}
                    onChange={(e) => setLocalSettings({ ...localSettings, theme: e.target.value as AccountSettings["theme"] })}
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="system">System</option>
                  </select>
                </div>
                <Input
                  label="Language"
                  value={localSettings.language}
                  onChange={(e) => setLocalSettings({ ...localSettings, language: e.target.value })}
                />
                <Button onClick={() => updateSettings.mutate(localSettings)} isLoading={updateSettings.isPending}>
                  Save changes
                </Button>
              </div>
            </Card>
          )}

          {tab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle><Bell className="mr-2 inline h-4 w-4 text-brand-cyan" />Notification preferences</CardTitle>
              </CardHeader>
              <div>
                <ToggleRow
                  label="Email reminders"
                  description="Get reminders for upcoming deadlines via email."
                  checked={localSettings.notifications.emailReminders}
                  onChange={(v) => setLocalSettings({ ...localSettings, notifications: { ...localSettings.notifications, emailReminders: v } })}
                />
                <ToggleRow
                  label="Task deadlines"
                  description="Notify me when a task is due soon."
                  checked={localSettings.notifications.taskDeadlines}
                  onChange={(v) => setLocalSettings({ ...localSettings, notifications: { ...localSettings.notifications, taskDeadlines: v } })}
                />
                <ToggleRow
                  label="Weekly digest"
                  description="A summary of your progress every Monday."
                  checked={localSettings.notifications.weeklyDigest}
                  onChange={(v) => setLocalSettings({ ...localSettings, notifications: { ...localSettings.notifications, weeklyDigest: v } })}
                />
                <ToggleRow
                  label="AI suggestions"
                  description="Proactive tips from CareerPilot AI."
                  checked={localSettings.notifications.aiSuggestions}
                  onChange={(v) => setLocalSettings({ ...localSettings, notifications: { ...localSettings.notifications, aiSuggestions: v } })}
                />
              </div>
              <Button className="mt-4" onClick={() => updateSettings.mutate(localSettings)} isLoading={updateSettings.isPending}>
                Save changes
              </Button>
            </Card>
          )}

          {tab === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle><KeyRound className="mr-2 inline h-4 w-4 text-brand-cyan" />Change password</CardTitle>
                </CardHeader>
                <form onSubmit={onChangePassword} className="flex flex-col gap-4">
                  {pwMessage && (
                    <div
                      className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs ${
                        pwMessage.type === "success"
                          ? "border-success/30 bg-success/10 text-success"
                          : "border-danger/30 bg-danger/10 text-danger"
                      }`}
                    >
                      {pwMessage.type === "success" ? (
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                      ) : (
                        <AlertCircle className="h-4 w-4 shrink-0" />
                      )}
                      {pwMessage.text}
                    </div>
                  )}
                  <Input label="Current password" type="password" {...registerPw("current", { required: true })} />
                  <Input label="New password" type="password" {...registerPw("next", { required: true, minLength: 8 })} />
                  <Button type="submit" className="self-start" isLoading={changePassword.isPending}>
                    Update password
                  </Button>
                </form>
              </Card>

              <Card className="border-danger/20">
                <CardHeader>
                  <CardTitle><Trash2 className="mr-2 inline h-4 w-4 text-danger" />Danger zone</CardTitle>
                </CardHeader>
                <p className="mb-4 text-sm text-ink-400">
                  Deleting your account removes your roadmap, tasks, and all analytics permanently.
                </p>
                {deleteError && <p className="mb-3 text-xs text-danger">{deleteError}</p>}
                <Button variant="danger" onClick={handleDeleteAccount} isLoading={deleteAccount.isPending}>
                  Delete account
                </Button>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
