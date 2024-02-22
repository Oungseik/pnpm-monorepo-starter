import dotenv from "dotenv";

dotenv.config();

const config = {
  authSecret: process.env.AUTH_SECRET || "your authentication token's secret",
  refreshSecret: process.env.REFRESH_SECRET || "your refresh token's secret",
  authTokenExpiresIn: process.env.NODE_ENV === "production" ? "15m" : "30d",
  refreshTokenExpiresIn: process.env.NODE_ENV === "production" ? "30d" : "60d",
  saltRounds: 10,
};

export default config;
