"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import useSWR, { mutate as globalMutate } from "swr";

import { api, fetcher } from "@/lib/api";

export interface AuthedUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  role: "admin" | "learner";
  avatarUrl?: string;
}

interface MeResponse {
  user: AuthedUser | null;
}

interface AuthContextValue {
  user: AuthedUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR<MeResponse>(
    "/api/auth/me",
    fetcher,
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const refresh = React.useCallback(async () => {
    await mutate();
  }, [mutate]);

  const logout = React.useCallback(async () => {
    await api("/api/auth/logout", { method: "POST" });
    // Wipe every SWR cache entry so the next user sees a clean slate.
    await globalMutate(() => true, undefined, { revalidate: false });
    router.replace("/login");
    router.refresh();
  }, [router]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user: data?.user ?? null,
      loading: isLoading,
      refresh,
      logout,
    }),
    [data, isLoading, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
