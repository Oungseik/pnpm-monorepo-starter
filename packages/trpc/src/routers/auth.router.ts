import { loginSchema, registerSchema } from "@lib/schema";
import { publicProcedure, router } from "@lib/trpc-express";
import { userModel } from "@repo/orm/user";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import config from "src/config";
import jwt from "jsonwebtoken";

export const authRouter = router({
  /**
   *
   * Login logic
   *
   * */
  login: publicProcedure.input(loginSchema).query(async ({ input }) => {
    const { email, password } = input;
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND", message: "No account with this email." });
    }

    const hashedPassword = user.password;
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Password does not correct." });
    }

    return {
      authToken: jwt.sign({ email }, config.authSecret, {
        expiresIn: config.authTokenExpiresIn,
      }),
      refreshToken: jwt.sign({ uuid: user.uuid }, config.refreshSecret, {
        expiresIn: config.refreshTokenExpiresIn,
      }),
    };
  }),

  /**
   *
   * Registration logic
   *
   * */
  register: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
    const { password, email } = input;
    const oldUser = await userModel.findByEmail(email);

    if (oldUser) {
      throw new TRPCError({ message: "Email is already in used.", code: "BAD_REQUEST" });
    }

    const count = await userModel.total();

    const hashedPassword = await bcrypt.hash(password, config.saltRounds);

    try {
      await userModel.create({
        email: email,
        password: hashedPassword,
        role: count.at(0)?.total === 0 ? "ADMIN" : "USER",
      });
      return { message: "OK" };
    } catch (err) {
      console.log(err);
      throw new TRPCError({ code: "BAD_REQUEST" });
    }
  }),
});

export type AuthRouter = typeof authRouter;
