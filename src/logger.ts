import * as pino from "pino";
import * as pinoHttp from "pino-http";
import * as uuidv4 from "uuid/v4";
import { Request, Response } from "koa";
import config from "./config";

const logger = pino({ name: "global", level: config.logging.level });

process.on("uncaughtException", err => {
  logger.error(err, "Uncaught exception");
  process.exit(1); // eslint-disable-line no-process-exit
});

process.on("unhandledRejection", err => {
  logger.error(err, "Unhandled promise rejection");
});

const requestLogger = pinoHttp({
  logger: logger.child({ name: "request" }),
  genReqId: uuidv4,
  serializers: {
    req: (req: Request) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res: Response) => ({ statusCode: res.status }),
  },
});

const serializeReq = pino.stdSerializers.req;
const serializeErr = pino.stdSerializers.err;

export const loggerMiddleware = () => async (ctx, next) => {
  requestLogger(ctx.req, ctx.res);
  ctx.logger = logger.child({ name: "context", id: ctx.req.id });
  try {
    await next();
  } catch (err) {
    logger.error(
      { err: serializeErr(err), req: serializeReq(ctx.req) },
      "middleware error",
    );
    throw err;
  }
};

export default logger;
