import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginForm from "./components/login-form";
import ThemeToggle from "./components/theme-toggle";
import { signOutAction } from "./actions/auth-actions";
import { Button } from "./components/ui/button";

type PageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const currentHeaders = await headers();
  const sessionResponse = await auth.api.getSession({
    headers: currentHeaders,
  });

  const resolvedParams = searchParams ? await searchParams : undefined;
  const errorMessage =
    resolvedParams?.error === "google"
      ? "We couldn't continue with Google. Please try again."
      : undefined;

  // If user not logged in → show login
  if (!sessionResponse) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <LoginForm errorMessage={errorMessage} />
      </main>
    );
  }

  const { user } = sessionResponse;

  return (
    <main className="relative min-h-screen w-full bg-background">

      {/* TOP BAR */}
      <div className="flex w-full items-center justify-between p-4">
        {/* LEFT */}
        <p className="text-sm text-muted-foreground">
          Signed in as <span className="font-medium">{user.email}</span>
        </p>

        {/* RIGHT */}
        <ThemeToggle />
      </div>

      {/* CENTER CONTENT */}
      <section className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
        <form action={signOutAction}>
          <Button
            type="submit"
            className="w-full rounded border px-4 py-2 text-sm font-medium hover:bg-emerald-400"
          >
            Sign out
          </Button>
        </form>
      </section>
    </main>
  );
}
