import { publicProcedure, router } from "../lib/trpc-express";

export const healthRouter = router({
  check: publicProcedure.query(() => {
    return { message: "TRPC is running" };
  }),
});
