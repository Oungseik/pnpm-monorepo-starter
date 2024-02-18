import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  /** JSON web token specific configurations */
  jwt: {
    authSecret: process.env.AUTH_SECRET || "secret for your authentication token",
    refreshSecret: process.env.REFRESH_SECRET || "secret for your refresh token",
  },
};

export type Config = typeof config;
