import pino from "pino";

const prod = process.env.PRODUCTION;

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: prod ? "logs/production.log" : "logs/combine.log" },
    },
    {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  ],
});

export const logger = pino(transport);
