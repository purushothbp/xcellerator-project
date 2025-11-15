import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./schema";

const baseURL =
  process.env.NEXT_BETTER_AUTH_URL ?? process.env.BETTER_AUTH_URL ?? undefined;
const secret =
  process.env.NEXT_BETTER_AUTH_SECRET ??
  process.env.BETTER_AUTH_SECRET ??
  process.env.AUTH_SECRET ??
  undefined;

const googleClientId =
  process.env.NEXT_GOOGLE_CLIENT_ID ?? process.env.GOOLE_CLIENT_ID ?? process.env.GOOGLE_CLIENT_ID;
const googleClientSecret =
  process.env.NEXT_GOOGLE_CLIENT_SECRET ??
  process.env.GOOLE_CLIENT_SECRET ??
  process.env.GOOGLE_CLIENT_SECRET;

const socialProviders =
  googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        },
      }
    : undefined;

export const auth = betterAuth({
  ...(baseURL ? { baseURL } : {}),
  ...(secret ? { secret } : {}),
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
  },
  ...(socialProviders ? { socialProviders } : {}),
});
