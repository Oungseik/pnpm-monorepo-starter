import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull(),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  create_at: integer("create_at", { mode: "timestamp" }).default(sql`CURRENT_TIMESTAMP`),
  role: text("role").notNull(),
  status: text("status").notNull().default("ACTIVE"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
