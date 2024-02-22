import { appRouter, createContext } from "@repo/trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express, { type Express } from "express";
import { expressHandler } from "trpc-playground/handlers/express";

const trpcApiEndpoint = "/api/trpc";
const playgroundEndpoint = "/api/trpc-playground";

const app: Express = express();
app.use(cors());
app.use(
  trpcApiEndpoint,
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(
  playgroundEndpoint,
  await expressHandler({
    trpcApiEndpoint,
    playgroundEndpoint,
    router: appRouter,
  })
);

export default app;
