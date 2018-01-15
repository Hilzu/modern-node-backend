import config from "../config";

const errorHandler = (err, req, res, _next) => {
  if (res.headersSent) {
    req.log.error(err, "Handling request failed after headers were sent");
    return;
  }

  const status = err.status || err.statusCode || 500;
  const logLevel = status < 500 ? "warn" : "error";
  req.log[logLevel](err, "Handling request failed");

  const body = {
    error: { message: err.message, name: err.name, status, data: err.data },
  };
  if (config.env === "development") {
    body.error.stack = err.stack;
  }

  res.status(status).json(body);
};

export default errorHandler;
