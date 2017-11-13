// @flow

import "source-map-support/register";
import app from "./app";
import config from "./config";
import logger from "./logger";

const server = app.listen(config.port, () => {
  logger.info(server.address(), "Server listening");
});
