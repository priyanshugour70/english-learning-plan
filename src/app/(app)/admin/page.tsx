"use client";

import * as React from "react";
import useSWR from "swr";
import {
  BarChart3,
  BookOpen,
  Crown,
  Mic,
  NotebookPen,
  Plus,
  Settings2,
  ShieldCheck,
  Trash2,
  Trophy,
  Users,
  Pencil,
  Loader2,
  ListChecks,
} from "lucide-react";

import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/contexts/toast-context";
import { api, fetcher } from "@/lib/api";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/ui/tabs";
import { Dialog } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";

import type { AccentToken } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────

interface StatsResponse {
  users: number;
  tasks: number;
  achievements: number;
  vocabulary: number;
  journal: number;
  recordings: number;
}

interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: AccentToken;
  tier: 1 | 2 | 3 | 4;
}

interface UserItem {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLoginAt: string | null;
  totalXp: number;
  streak: number;
  completedTasks: number;
}

interface AppConfig {
  key: string;
  appName: string;
  appDescription: string;
  primaryColor: string;
  accentColors: Record<string, string>;
  dashboardMessage: string;
  enableAI: boolean;
  updatedAt: string;
}

// ─── Accent helpers ───────────────────────────────────────────────────────

const ACCENT_OPTIONS: AccentToken[] = [
  "emerald",
  "sky",
  "amber",
  "violet",
  "rose",
  "orange",
  "pink",
];

const TIER_LABELS: Record<number, string> = {
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Platinum",
};

const accentToBadgeTone: Record<AccentToken, "emerald" | "sky" | "amber" | "violet" | "rose" | "orange" | "pink"> = {
  emerald: "emerald",
  sky: "sky",
  amber: "amber",
  violet: "violet",
  rose: "rose",
  orange: "orange",
  pink: "pink",
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const [tab, setTab] = React.useState("overview");

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={<ShieldCheck className="h-6 w-6" />}
          title="Access denied"
          description="You do not have permission to view the admin panel."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Data Studio
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage users, achievements, and app configuration.
        </p>
      </div>

      <Tabs
        value={tab}
        onValueChange={setTab}
        variant="underline"
        items={[
          { value: "overview", label: "Overview", icon: <BarChart3 className="h-4 w-4" /> },
          { value: "achievements", label: "Achievements", icon: <Trophy className="h-4 w-4" /> },
          { value: "users", label: "Users", icon: <Users className="h-4 w-4" /> },
          { value: "config", label: "Config", icon: <Settings2 className="h-4 w-4" /> },
        ]}
      />

      {tab === "overview" && <OverviewTab />}
      {tab === "achievements" && <AchievementsTab />}
      {tab === "users" && <UsersTab />}
      {tab === "config" && <ConfigTab />}
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────

function OverviewTab() {
  const { data, isLoading } = useSWR<StatsResponse>(
    "/api/admin/stats",
    fetcher,
  );

  const cards = [
    { label: "Users", value: data?.users, icon: Users, color: "text-violet" },
    { label: "Tasks in Plan", value: data?.tasks, icon: ListChecks, color: "text-sky" },
    { label: "Achievements", value: data?.achievements, icon: Trophy, color: "text-amber" },
    { label: "Vocabulary Entries", value: data?.vocabulary, icon: BookOpen, color: "text-emerald" },
    { label: "Journal Entries", value: data?.journal, icon: NotebookPen, color: "text-rose" },
    { label: "Recordings", value: data?.recordings, icon: Mic, color: "text-orange" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {c.label}
              </span>
              <c.icon className={cn("h-4 w-4", c.color)} />
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-8 w-20 rounded bg-surface-muted animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-foreground">
                {c.value?.toLocaleString() ?? "—"}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// ─── Achievements Tab ─────────────────────────────────────────────────────

const emptyAchievement = {
  id: "",
  title: "",
  description: "",
  icon: "🏆",
  accent: "emerald" as AccentToken,
  tier: 1 as 1 | 2 | 3 | 4,
};

function AchievementsTab() {
  const { data, mutate, isLoading } = useSWR<{ achievements: AchievementItem[] }>(
    "/api/admin/achievements",
    fetcher,
  );
  const { toast } = useToast();
  const [form, setForm] = React.useState(emptyAchievement);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [saving, setSaving] = React.useState(false);

  const achievements = data?.achievements ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        const { id: _id, ...updates } = form;
        void _id;
        await api(`/api/admin/achievements/${editingId}`, {
          method: "PATCH",
          body: updates,
        });
        toast({ title: "Achievement updated", variant: "success" });
      } else {
        await api("/api/admin/achievements", { method: "POST", body: form });
        toast({ title: "Achievement created", variant: "success" });
      }
      setForm(emptyAchievement);
      setEditingId(null);
      mutate();
    } catch (err) {
      toast({ title: (err as Error).message, variant: "info" });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await api(`/api/admin/achievements/${id}`, { method: "DELETE" });
      toast({ title: "Achievement deleted", variant: "success" });
      mutate();
    } catch (err) {
      toast({ title: (err as Error).message, variant: "info" });
    }
  }

  function startEdit(a: AchievementItem) {
    setEditingId(a.id);
    setForm({ ...a });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyAchievement);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {editingId ? "Edit Achievement" : "Add Achievement"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ach-id">ID</Label>
                <Input
                  id="ach-id"
                  placeholder="e.g. first-task"
                  value={form.id}
                  disabled={!!editingId}
                  onChange={(e) => setForm((p) => ({ ...p, id: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ach-title">Title</Label>
                <Input
                  id="ach-title"
                  placeholder="Achievement title"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="ach-desc">Description</Label>
                <Input
                  id="ach-desc"
                  placeholder="What the user did to earn this"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ach-icon">Icon (emoji)</Label>
                <Input
                  id="ach-icon"
                  placeholder="🏆"
                  value={form.icon}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, icon: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ach-accent">Accent</Label>
                <select
                  id="ach-accent"
                  value={form.accent}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      accent: e.target.value as AccentToken,
                    }))
                  }
                  className="flex h-10 w-full rounded-[var(--radius)] border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {ACCENT_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ach-tier">Tier</Label>
                <select
                  id="ach-tier"
                  value={form.tier}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      tier: Number(e.target.value) as 1 | 2 | 3 | 4,
                    }))
                  }
                  className="flex h-10 w-full rounded-[var(--radius)] border border-border bg-surface px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {([1, 2, 3, 4] as const).map((t) => (
                    <option key={t} value={t}>
                      {TIER_LABELS[t]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit" disabled={saving} loading={saving}>
                <Plus className="h-4 w-4" />
                {editingId ? "Update" : "Add Achievement"}
              </Button>
              {editingId && (
                <Button variant="ghost" onClick={cancelEdit}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : achievements.length === 0 ? (
        <EmptyState
          icon={<Trophy className="h-6 w-6" />}
          title="No achievements yet"
          description="Create your first achievement above."
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Icon
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Title
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                    Description
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Accent
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Tier
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {achievements.map((a) => (
                  <tr
                    key={a.id}
                    className="border-b border-border last:border-0 hover:bg-surface-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 text-lg">{a.icon}</td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      {a.title}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell max-w-[200px] truncate">
                      {a.description}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={accentToBadgeTone[a.accent]}>
                        {a.accent}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="neutral">{TIER_LABELS[a.tier]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => startEdit(a)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(a.id)}
                        >
                          <Trash2 className="h-4 w-4 text-danger" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────

function UsersTab() {
  const { data, mutate, isLoading } = useSWR<{ users: UserItem[] }>(
    "/api/admin/users",
    fetcher,
  );
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = React.useState<UserItem | null>(null);
  const [deleting, setDeleting] = React.useState(false);

  const users = data?.users ?? [];

  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api(`/api/admin/users/${deleteTarget.id}`, { method: "DELETE" });
      toast({ title: `User "${deleteTarget.name}" deleted`, variant: "success" });
      setDeleteTarget(null);
      mutate();
    } catch (err) {
      toast({ title: (err as Error).message, variant: "info" });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : users.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6" />}
          title="No users yet"
          description="Users will appear here once they register."
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    XP
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    Streak
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right hidden md:table-cell">
                    Tasks Done
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">
                    Last Login
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-border last:border-0 hover:bg-surface-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {u.name}
                        </span>
                        {u.isAdmin && (
                          <Badge tone="violet" size="sm">
                            <Crown className="h-3 w-3" />
                            Admin
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                      {u.email}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-foreground">
                      {u.totalXp.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-foreground">
                      {u.streak}
                    </td>
                    <td className="px-4 py-3 text-right text-muted-foreground hidden md:table-cell">
                      {u.completedTasks}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(u)}
                      >
                        <Trash2 className="h-4 w-4 text-danger" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete user"
        description={`This will permanently delete "${deleteTarget?.name}" and all their data (progress, settings, vocabulary, journal, recordings). This action cannot be undone.`}
      >
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            disabled={deleting}
            loading={deleting}
          >
            Delete User
          </Button>
        </div>
      </Dialog>
    </>
  );
}

// ─── Config Tab ───────────────────────────────────────────────────────────

function ConfigTab() {
  const { data, mutate, isLoading } = useSWR<{ config: AppConfig }>(
    "/api/admin/config",
    fetcher,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <ConfigForm config={data?.config ?? null} onSaved={() => mutate()} />;
}

function ConfigForm({
  config,
  onSaved,
}: {
  config: AppConfig | null;
  onSaved: () => void;
}) {
  const { toast } = useToast();
  const [form, setForm] = React.useState(() => ({
    appName: config?.appName ?? "",
    appDescription: config?.appDescription ?? "",
    primaryColor: config?.primaryColor ?? "#6366f1",
    dashboardMessage: config?.dashboardMessage ?? "",
    enableAI: config?.enableAI ?? true,
  }));
  const [saving, setSaving] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await api("/api/admin/config", { method: "PATCH", body: form });
      toast({ title: "Config saved", variant: "success" });
      onSaved();
    } catch (err) {
      toast({ title: (err as Error).message, variant: "info" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cfg-name">App Name</Label>
              <Input
                id="cfg-name"
                value={form.appName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, appName: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfg-color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="cfg-color"
                  value={form.primaryColor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, primaryColor: e.target.value }))
                  }
                />
                <div
                  className="h-10 w-10 flex-shrink-0 rounded-[var(--radius)] border border-border"
                  style={{ backgroundColor: form.primaryColor }}
                />
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cfg-desc">App Description</Label>
              <Input
                id="cfg-desc"
                value={form.appDescription}
                onChange={(e) =>
                  setForm((p) => ({ ...p, appDescription: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="cfg-msg">Dashboard Message</Label>
              <Textarea
                id="cfg-msg"
                value={form.dashboardMessage}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    dashboardMessage: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              role="switch"
              aria-checked={form.enableAI}
              onClick={() =>
                setForm((p) => ({ ...p, enableAI: !p.enableAI }))
              }
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                form.enableAI ? "bg-primary" : "bg-border",
              )}
            >
              <span
                className={cn(
                  "inline-block h-4 w-4 rounded-full bg-white transition-transform",
                  form.enableAI ? "translate-x-6" : "translate-x-1",
                )}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              Enable AI Features
            </span>
          </label>

          <Button type="submit" disabled={saving} loading={saving}>
            Save Config
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
