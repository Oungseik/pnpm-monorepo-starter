import dotenv from "dotenv";

dotenv.config();
const config = {
  authSecret: process.env.AUTH_SECRET || "your authentication token's secret",
};

export default config;
