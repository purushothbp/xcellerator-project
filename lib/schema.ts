import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  doublePrecision,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "auth_users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").notNull().default(false),
    name: text("name").notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
);

export const session = pgTable(
  "auth_sessions",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
);

export const account = pgTable(
  "auth_accounts",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    providerId: text("provider_id").notNull(),
    accountId: text("account_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "date",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "date",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    providerAccountUnique: uniqueIndex("auth_accounts_provider_account_idx").on(
      table.providerId,
      table.accountId,
    ),
  }),
);

export const verification = pgTable(
  "auth_verifications",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  },
);

export const rateLimit = pgTable("auth_rate_limits", {
  key: text("key").primaryKey(),
  count: integer("count").notNull().default(0),
  lastRequest: doublePrecision("last_request").notNull(),
});
