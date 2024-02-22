import { authRouter } from "@routers/auth.router";

import { router } from "./lib/trpc-express";
import { healthRouter } from "./routers/healthcheck.router";

export const appRouter = router({
  health: healthRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;

export { createContext } from "./lib/trpc-express";
