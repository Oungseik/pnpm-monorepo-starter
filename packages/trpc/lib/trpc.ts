import { TRPCError, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import jwt from "jsonwebtoken";

import { config } from "@repo/config";

export const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
  const token = req.headers.authorization?.slice(7);
  return { token };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const authProcedure = publicProcedure.use(async (opts) => {
  const { token } = opts.ctx;

  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Authorization token not provided." });
  }

  return opts.next();
});
