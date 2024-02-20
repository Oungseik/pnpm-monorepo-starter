import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  /** JSON web token specific configurations */
  jwt: {
    authSecret: process.env.AUTH_SECRET || "secret for your authentication token",
    refreshSecret: process.env.REFRESH_SECRET || "secret for your refresh token",
  },

  /** config for apps/server */
  server: {
    port: process.env.SERVER_PORT || 8080,
  },
};

export type Config = typeof config;
