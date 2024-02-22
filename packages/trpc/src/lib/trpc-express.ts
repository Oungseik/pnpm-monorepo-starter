import { userModel } from "@repo/orm/user";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import * as jwt from "jsonwebtoken";

import config from "../config";

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

  let decoded: string | jwt.JwtPayload;
  try {
    decoded = jwt.verify(token, config.authSecret);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: e.message });
    }
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }

  if (typeof decoded === "string" || !("email" in decoded)) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid authorization token." });
  }

  const user = await userModel.findByEmail(decoded.email);

  if (!user) {
    throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
  }

  return opts.next({ ctx: { user } });
});

export const adminProcedure = authProcedure.use(async (opts) => {
  if (opts.ctx.user.role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN", message: "You're not admin to perform this action." });
  }
  const user = { ...opts.ctx.user, role: "ADMIN" as const };
  return opts.next({ ctx: { user } });
});
