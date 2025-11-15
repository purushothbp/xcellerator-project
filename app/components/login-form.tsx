"use client";

import Image from "next/image";
import { signInWithGoogleAction } from "@/app/actions/auth-actions";

export default function LoginForm({
  errorMessage,
}: {
  errorMessage?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-border/60 bg-card/90 p-6 sm:p-8 text-center shadow-xl backdrop-blur" style={{ margin: '0 auto', maxWidth: '448px' }}>
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with Google to continue.
        </p>
      </div>

      {errorMessage && (
        <p className="rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <form action={signInWithGoogleAction} className="pt-2">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border/70 bg-background/80 px-5 py-3 text-sm font-medium shadow-sm transition hover:scale-[1.01] hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Image
            src="/google.svg"
            alt="Google logo"
            width={20}
            height={20}
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
}
