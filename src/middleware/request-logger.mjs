import pinoHttp from "pino-http";
import uuidv4 from "uuid/v4";
import logger from "../logger";

const requestLogger = logger.child({ name: "request" });

const serializeReq = req => ({ id: req.id, method: req.method, url: req.url });

const serializeRes = res => ({ statusCode: res.statusCode });

const createRequestLoggerMiddleware = () =>
  pinoHttp({
    logger: requestLogger,
    genReqId: uuidv4,
    serializers: {
      req: serializeReq,
      res: serializeRes,
    },
  });

export default createRequestLoggerMiddleware;
