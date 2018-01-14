import express from "express";
import requestLogger from "./middleware/request-logger";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import rootRouter from "./routes/root";

const app = express();

app.use(requestLogger());

app.use(rootRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
