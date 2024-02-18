import { router } from "./lib/trpc-express";

export const appRouter = router({});

export type AppRouter = typeof appRouter;
