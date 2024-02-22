import Database from "better-sqlite3";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { users } from "../schema/user.schema";

dotenv.config();

const sqlite = new Database(process.env.SQLITE_URL);

export const db = drizzle(sqlite, { schema: { users } });
