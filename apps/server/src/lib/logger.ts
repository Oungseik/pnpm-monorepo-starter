import pino from "pino";

const transport = pino.transport({
  targets: [
    { target: "pino/file", options: { destination: "logs/combine.log" } },
    {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  ],
});

export const logger = pino(transport);
