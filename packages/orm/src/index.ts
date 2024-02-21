import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { users } from "./lib/schema/user.schema";

const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite, { schema: { users } });

export { users } from "./lib/schema/user.schema";
