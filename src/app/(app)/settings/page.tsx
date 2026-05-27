"use client";

import { useState } from "react";
import {
  Database,
  KeyRound,
  LogOut,
  RefreshCw,
  Save,
  Trash2,
  UserX,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/auth-context";
import { useSettings } from "@/contexts/settings-context";
import { useProgress } from "@/contexts/progress-context";
import { useToast } from "@/contexts/toast-context";
import { useTheme } from "@/contexts/theme-context";
import { api } from "@/lib/api";

const TIME_OPTIONS = [10, 15, 20, 25, 30, 45, 60];

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
  "bg-indigo-500",
  "bg-pink-500",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function SettingsPage() {
  const { settings, update } = useSettings();
  const { resetAll } = useProgress();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(settings.name);
  const [goal, setGoal] = useState(settings.goal);
  const [resetOpen, setResetOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [reseedPending, setReseedPending] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePwPending, setChangePwPending] = useState(false);

  async function save() {
    await update({ name: name.trim() || "friend", goal: goal.trim() });
    toast({ title: "Saved", variant: "success" });
  }

  async function hardReset() {
    setResetOpen(false);
    await resetAll();
    toast({
      title: "Progress reset",
      description: "Your XP, streak and history have been cleared.",
      variant: "info",
    });
  }

  async function reseedPlan() {
    setReseedPending(true);
    try {
      await api<{ ok: boolean }>("/api/seed?force=1", { method: "POST" });
      toast({
        title: "Plan re-seeded",
        description: "Latest plan + achievements pushed to your database.",
        variant: "success",
      });
      setTimeout(() => window.location.reload(), 600);
    } catch {
      toast({ title: "Seed failed", variant: "info" });
    } finally {
      setReseedPending(false);
    }
  }

  async function changePassword() {
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "info" });
      return;
    }
    if (newPassword.length < 8) {
      toast({
        title: "New password must be at least 8 characters",
        variant: "info",
      });
      return;
    }
    setChangePwPending(true);
    try {
      await api("/api/auth/change-password", {
        method: "POST",
        body: { currentPassword, newPassword },
      });
      toast({ title: "Password changed", variant: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Failed to change password";
      toast({ title: msg, variant: "info" });
    } finally {
      setChangePwPending(false);
    }
  }

  async function deleteAccount() {
    setDeletePending(true);
    try {
      await api("/api/auth/delete-account", { method: "DELETE" });
      toast({
        title: "Account deleted",
        description: "Your account and all data have been removed.",
        variant: "info",
      });
      router.replace("/login");
    } catch {
      toast({ title: "Failed to delete account", variant: "info" });
    } finally {
      setDeletePending(false);
      setDeleteOpen(false);
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-3xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Settings
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-semibold tracking-tight">
          Make it yours
        </h1>
      </div>

      {user ? (
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${avatarColor(user.name)}`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="goal">Your goal</Label>
            <Textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={save}>
              <Save className="h-4 w-4" /> Save changes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={changePassword}
              disabled={
                changePwPending ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
            >
              <KeyRound className="h-4 w-4" />
              {changePwPending ? "Changing…" : "Change password"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice rhythm</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Sets your daily XP goal. Pick what you can actually do today.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {TIME_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={async () => {
                  await update({ dailyTimeMinutes: m });
                  toast({
                    title: "Updated",
                    description: `${m} min/day`,
                    variant: "success",
                  });
                }}
                className={`h-12 rounded-[var(--radius)] border text-sm font-medium transition-colors ${
                  settings.dailyTimeMinutes === m
                    ? "border-primary bg-primary-soft text-primary-soft-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {(["system", "light", "dark"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`h-12 rounded-[var(--radius)] border text-sm font-medium capitalize transition-colors ${
                  theme === t
                    ? "border-primary bg-primary-soft text-primary-soft-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your data</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Everything lives in your MongoDB. Re-seed pushes the latest plan
            and achievement catalog from the codebase.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={reseedPlan}
              disabled={reseedPending}
            >
              <Database className="h-4 w-4" />
              {reseedPending ? "Re-seeding…" : "Re-seed plan & achievements"}
            </Button>
            <Button variant="danger" onClick={() => setResetOpen(true)}>
              <Trash2 className="h-4 w-4" /> Reset my progress
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Resetting progress wipes XP, streak, completed tasks and unlocked
            achievements. Vocabulary, journal and recordings are kept.
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-500">Danger zone</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Permanently delete your account and all associated data. This
            action cannot be undone.
          </p>
        </CardHeader>
        <CardContent>
          <Button variant="danger" onClick={() => setDeleteOpen(true)}>
            <UserX className="h-4 w-4" /> Delete my account
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset all progress?"
        description="Wipes XP, streak, completed tasks and unlocked achievements. Cannot be undone."
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setResetOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={hardReset}>
            <RefreshCw className="h-4 w-4" /> Yes, reset
          </Button>
        </div>
      </Dialog>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete your account?"
        description="This will permanently remove your account, progress, vocabulary, journal entries, and recordings. This cannot be undone."
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={deleteAccount}
            disabled={deletePending}
          >
            <Trash2 className="h-4 w-4" />
            {deletePending ? "Deleting…" : "Yes, delete everything"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
