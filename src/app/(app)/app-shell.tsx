"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { OnboardingScreen } from "@/components/onboarding/onboarding-screen";
import { useSettings } from "@/contexts/settings-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { settings, hydrated } = useSettings();

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!settings.onboardingCompletedAt) {
    return <OnboardingScreen />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-x-hidden pb-20 lg:pb-10">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}
