/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/lib/schema/*",
  out: "./sqlite/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "/home/oung/Projects/node/pnpm-monorepo/apps/server/sqlite/development.db",
  },
};
