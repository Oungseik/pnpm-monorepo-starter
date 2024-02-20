/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./lib/schema/*",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./sqlite/development.db",
  },
};
