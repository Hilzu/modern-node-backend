import express from "express";
import requestLogger from "./middleware/request-logger";
import errorHandler from "./middleware/error-handler";
import notFound from "./middleware/not-found";
import examplesRouter from "./routes/examples";

const app = express();

app.use(requestLogger());
app.use(express.json());

app.use("/examples", examplesRouter);

app.use(notFound);

app.use(errorHandler);

export default app;
