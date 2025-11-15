import "dotenv/config";
import { defineConfig } from "drizzle-kit";

if (!process.env.NEXT_DATABASE_URL) {
  throw new Error(
    "NEXT_DATABASE_URL is not defined. Set it in your .env before running Drizzle Kit commands.",
  );
}

export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
