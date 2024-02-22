import { count, eq } from "drizzle-orm";

import { db } from "../datasource/sqlite";
import { users } from "../schema/user.schema";

function findByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

async function total() {
  return db.select({ total: count(users.id) }).from(users);
}

type CreateUserArg = {
  email: string;
  password: string;
  role: "ADMIN" | "USER";
};

async function create({ email, password, role }: CreateUserArg) {
  return db.insert(users).values({ email, password, uuid: crypto.randomUUID(), role });
}

export const userModel = {
  findByEmail,
  total,
  create,
};

export type { NewUser, User } from "../schema/user.schema";
