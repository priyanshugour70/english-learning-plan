import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          404
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Lost in translation
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That page doesn&apos;t exist. Let&apos;s get you back on the plan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-[var(--radius)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
