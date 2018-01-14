import pino from "pino";
import config from "./config";

const logger = pino({
  name: "global",
  level: config.logging.level,
});

process.on("uncaughtException", err => {
  logger.error(err, "Uncaught exception");
  process.exit(1); // eslint-disable-line no-process-exit
});

process.on("unhandledRejection", err => {
  logger.error(err, "Unhandled promise rejection");
});

export default logger;
