import { neonConfig, neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.NEXT_DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "NEXT_DATABASE_URL is not set. Update your .env with the Neon connection string.",
  );
}

neonConfig.fetchConnectionCache = true;

const sql = neon(connectionString);

export const db = drizzle(sql, { schema });
export { schema };
