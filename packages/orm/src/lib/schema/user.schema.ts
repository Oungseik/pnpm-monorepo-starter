import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import crypto from "crypto";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull().default(crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  create_at: integer("create_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  role: text("role").notNull().default("TESTER"),
  status: text("status").notNull().default("ACTIVE"),
});
