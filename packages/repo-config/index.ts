import dotenv from "dotenv";

dotenv.config();

export const config = {
  /** JSON web token specific configurations */
  jwt: {},
};

export type Config = typeof config;
