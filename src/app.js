import Koa from "koa";
import config from "./config";
import { loggerMiddleware } from "./logger";

const app = new Koa();

app.silent = config.env === "production";

app.use(loggerMiddleware());

app.use(ctx => {
  ctx.logger.info("Hello world!");
  ctx.body = { hello: "world" };
});

export default app;
