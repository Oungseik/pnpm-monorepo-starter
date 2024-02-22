import { db } from "../datasource/sqlite";
import { users } from "../schema/user.schema";
import { eq, count } from "drizzle-orm";

function findByEmail(email: string) {
  return db.query.users.findFirst({ where: eq(users.email, email) });
}

async function total() {
  return db.select({ total: count(users.id) }).from(users);
}

async function create({ email, password }: { email: string; password: string }) {
  return db.insert(users).values({ email, password });
}

export const userModel = {
  findByEmail,
  total,
  create,
};
