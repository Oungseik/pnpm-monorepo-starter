import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";

import app from "./app";
import { config } from "@repo/config";
import { appRouter } from "@repo/trpc";
import { logger } from "./lib/logger";

const server = app.listen(config.server.port, () => {
  logger.info(`Server is running on port ${config.server.port}`);
});

/* TODO - if you don't want to use websocket delete from this  */
const wss = new WebSocketServer({ server });

const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: async ({ req }) => {
    const token = req.headers.authorization?.slice(7);
    return { token };
  },
});

wss.on("connection", (ws) => {
  logger.info(`Connection (${wss.clients.size})`);
  ws.once("close", () => {
    logger.info(`Connection (${wss.clients.size})`);
  });
});

process.on("SIGTERM", () => {
  logger.warn("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
  process.exit(1);
});

process.on("SIGINT", () => {
  logger.warn("SIGINT");
  handler.broadcastReconnectNotification();
  wss.close();
  process.exit(1);
});
